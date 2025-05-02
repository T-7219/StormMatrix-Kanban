import { Injectable, UnauthorizedException, BadRequestException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { UsersService } from '../users/users.service';
import { TwoFactorAuthService } from '../two-factor-auth/two-factor-auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private twoFactorAuthService: TwoFactorAuthService,
    @Inject('NOTIFICATION_SERVICE') private notificationClient: ClientProxy,
  ) {}

  async register(registerDto: RegisterDto) {
    // Check if user already exists
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    // Create new user
    const user = await this.usersService.create(registerDto);

    // Send welcome notification event
    this.notificationClient.emit('user_registered', {
      userId: user.id,
      email: user.email,
      name: user.name,
      language: user.language,
    });

    // Return user without sensitive fields
    const { password, twoFactorSecret, twoFactorRecoveryCodes, ...result } = user;
    return result;
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.active) {
      throw new UnauthorizedException('User account is inactive');
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Update last login timestamp
    await this.usersService.updateLastLogin(user.id);

    // Return user without password
    const { password: _, ...result } = user;
    return result;
  }

  async login(user: any) {
    // Check if 2FA is enabled
    if (user.twoFactorEnabled) {
      // Generate a temporary token for 2FA validation
      const temporaryToken = this.jwtService.sign(
        { 
          email: user.email,
          sub: user.id,
          isTwoFactorTemporaryToken: true 
        },
        { 
          expiresIn: '5m',
        }
      );

      return {
        requires2FA: true,
        temporaryToken,
      };
    }

    // If 2FA is not enabled, generate regular tokens
    return this.generateTokens(user);
  }

  async refreshToken(refreshToken: string) {
    try {
      // Verify refresh token
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('jwt.secret'),
      });

      // Get user by ID
      const user = await this.usersService.findById(payload.sub);
      if (!user || !user.active) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Generate new tokens
      return this.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async verify2FA(userId: string, code: string) {
    const user = await this.usersService.findById(userId);
    if (!user || !user.twoFactorEnabled) {
      throw new UnauthorizedException('Two-factor authentication is not enabled');
    }

    const isValid = await this.twoFactorAuthService.verifyToken(user.twoFactorSecret, code);
    if (!isValid) {
      throw new UnauthorizedException('Invalid two-factor authentication code');
    }

    // Generate regular tokens after successful 2FA
    return this.generateTokens(user);
  }

  private generateTokens(user: User) {
    const payload = { email: user.email, sub: user.id, roles: user.roles };
    
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, {
        expiresIn: this.configService.get<string>('jwt.refreshExpiresIn'),
      }),
      token_type: 'Bearer',
      expires_in: parseInt(this.configService.get<string>('jwt.expiresIn'), 10),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }

  async logout(userId: string) {
    // In a real implementation, you might want to invalidate the token
    // This could be done by adding the token to a blacklist in Redis
    // For simplicity, we'll just return a success message
    return { message: 'Successfully logged out' };
  }
}