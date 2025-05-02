import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { UsersService } from '../users/users.service';
import { TwoFactorAuthService } from '../two-factor-auth/two-factor-auth.service';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    private configService;
    private twoFactorAuthService;
    private notificationClient;
    constructor(usersService: UsersService, jwtService: JwtService, configService: ConfigService, twoFactorAuthService: TwoFactorAuthService, notificationClient: ClientProxy);
    register(registerDto: RegisterDto): Promise<{
        id: string;
        email: string;
        name: string;
        language: string;
        active: boolean;
        twoFactorEnabled: boolean;
        roles: string[];
        createdAt: Date;
        updatedAt: Date;
        lastLoginAt: Date;
    }>;
    validateUser(email: string, password: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        refresh_token: string;
        token_type: string;
        expires_in: number;
        user: {
            id: string;
            email: string;
            name: string;
        };
    } | {
        requires2FA: boolean;
        temporaryToken: string;
    }>;
    refreshToken(refreshToken: string): Promise<{
        access_token: string;
        refresh_token: string;
        token_type: string;
        expires_in: number;
        user: {
            id: string;
            email: string;
            name: string;
        };
    }>;
    verify2FA(userId: string, code: string): Promise<{
        access_token: string;
        refresh_token: string;
        token_type: string;
        expires_in: number;
        user: {
            id: string;
            email: string;
            name: string;
        };
    }>;
    private generateTokens;
    logout(userId: string): Promise<{
        message: string;
    }>;
}
