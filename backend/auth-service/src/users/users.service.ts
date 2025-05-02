import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterDto } from '../auth/dto/register.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private configService: ConfigService
  ) {
    // Create admin user if no users exist
    this.createAdminIfNoUsers();
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async create(registerDto: RegisterDto): Promise<User> {
    const user = this.usersRepository.create({
      ...registerDto,
      roles: ['user'],
      active: true,
    });
    return this.usersRepository.save(user);
  }

  async updateLastLogin(id: string): Promise<void> {
    await this.usersRepository.update(id, { 
      lastLoginAt: new Date() 
    });
  }

  async updateTwoFactorSecret(userId: string, secret: string): Promise<User> {
    await this.usersRepository.update(userId, { twoFactorSecret: secret });
    return this.findById(userId);
  }

  async enableTwoFactor(userId: string, recoveryCodes: string[]): Promise<User> {
    await this.usersRepository.update(userId, { 
      twoFactorEnabled: true,
      twoFactorRecoveryCodes: recoveryCodes 
    });
    return this.findById(userId);
  }

  async disableTwoFactor(userId: string): Promise<User> {
    await this.usersRepository.update(userId, { 
      twoFactorEnabled: false,
      twoFactorSecret: null,
      twoFactorRecoveryCodes: [] 
    });
    return this.findById(userId);
  }

  private async createAdminIfNoUsers(): Promise<void> {
    const usersCount = await this.usersRepository.count();
    
    if (usersCount === 0) {
      const adminEmail = this.configService.get<string>('admin.email');
      const adminPassword = this.configService.get<string>('admin.password');

      const admin = this.usersRepository.create({
        email: adminEmail,
        password: adminPassword,
        name: 'Admin User',
        roles: ['user', 'admin'],
        active: true,
      });

      await this.usersRepository.save(admin);
      console.log(`Admin user created with email: ${adminEmail}`);
    }
  }
}