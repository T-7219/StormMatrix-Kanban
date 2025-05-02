import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  async getUsers(
    active?: boolean,
    search?: string,
    limit: number = 20,
    offset: number = 0,
  ) {
    const queryBuilder = this.usersRepository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.email',
        'user.name',
        'user.language',
        'user.active',
        'user.roles',
        'user.createdAt',
        'user.lastLoginAt',
      ]);

    if (active !== undefined) {
      queryBuilder.andWhere('user.active = :active', { active });
    }

    if (search) {
      queryBuilder.andWhere(
        '(user.name ILIKE :search OR user.email ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    const [users, total] = await queryBuilder
      .take(limit)
      .skip(offset)
      .getManyAndCount();

    return {
      total,
      limit,
      offset,
      data: users,
    };
  }

  async getUserById(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
      select: [
        'id', 
        'email', 
        'name', 
        'language', 
        'active', 
        'roles', 
        'createdAt',
        'lastLoginAt',
        'twoFactorEnabled'
      ],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async updateUser(id: string, updateData: Partial<User>) {
    const user = await this.getUserById(id);

    // Prevent modification of sensitive fields
    delete updateData.password;
    delete updateData.twoFactorSecret;
    delete updateData.twoFactorRecoveryCodes;

    await this.usersRepository.update(id, updateData);
    return this.getUserById(id);
  }

  async deactivateUser(id: string) {
    const user = await this.getUserById(id);

    // Prevent deactivation of the last admin
    if (user.roles.includes('admin')) {
      const adminCount = await this.usersRepository.count({
        where: {
          roles: 'admin',
          active: true,
        },
      });

      if (adminCount <= 1) {
        throw new BadRequestException('Cannot deactivate the last admin user');
      }
    }

    await this.usersRepository.update(id, { active: false });
    return { message: `User ${id} has been deactivated` };
  }

  async activateUser(id: string) {
    await this.getUserById(id);
    await this.usersRepository.update(id, { active: true });
    return { message: `User ${id} has been activated` };
  }

  async getSystemSettings() {
    // In a real implementation, this would retrieve settings from a database
    // For now, we're just returning configuration values
    return {
      smtp: {
        host: this.configService.get<string>('smtp.host'),
        port: this.configService.get<number>('smtp.port'),
        username: this.configService.get<string>('smtp.username'),
        from_email: this.configService.get<string>('smtp.fromEmail'),
        from_name: this.configService.get<string>('smtp.fromName'),
      },
      telegram_bot_enabled: !!this.configService.get<string>('telegram.botToken'),
      max_file_size_mb: this.configService.get<number>('file.maxSizeMb'),
      allowed_file_types: this.configService.get<string[]>('file.allowedTypes'),
      logo_url: this.configService.get<string>('app.logoUrl'),
    };
  }
}