import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterDto } from '../auth/dto/register.dto';
import { ConfigService } from '@nestjs/config';
export declare class UsersService {
    private usersRepository;
    private configService;
    constructor(usersRepository: Repository<User>, configService: ConfigService);
    findByEmail(email: string): Promise<User>;
    findById(id: string): Promise<User>;
    create(registerDto: RegisterDto): Promise<User>;
    updateLastLogin(id: string): Promise<void>;
    updateTwoFactorSecret(userId: string, secret: string): Promise<User>;
    enableTwoFactor(userId: string, recoveryCodes: string[]): Promise<User>;
    disableTwoFactor(userId: string): Promise<User>;
    private createAdminIfNoUsers;
}
