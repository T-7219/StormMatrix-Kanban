"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const config_1 = require("@nestjs/config");
const user_entity_1 = require("../users/entities/user.entity");
let AdminService = class AdminService {
    constructor(usersRepository, configService) {
        this.usersRepository = usersRepository;
        this.configService = configService;
    }
    async getUsers(active, search, limit = 20, offset = 0) {
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
            queryBuilder.andWhere('(user.name ILIKE :search OR user.email ILIKE :search)', { search: `%${search}%` });
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
    async getUserById(id) {
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
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }
    async updateUser(id, updateData) {
        const user = await this.getUserById(id);
        delete updateData.password;
        delete updateData.twoFactorSecret;
        delete updateData.twoFactorRecoveryCodes;
        await this.usersRepository.update(id, updateData);
        return this.getUserById(id);
    }
    async deactivateUser(id) {
        const user = await this.getUserById(id);
        if (user.roles.includes('admin')) {
            const adminCount = await this.usersRepository.count({
                where: {
                    roles: 'admin',
                    active: true,
                },
            });
            if (adminCount <= 1) {
                throw new common_1.BadRequestException('Cannot deactivate the last admin user');
            }
        }
        await this.usersRepository.update(id, { active: false });
        return { message: `User ${id} has been deactivated` };
    }
    async activateUser(id) {
        await this.getUserById(id);
        await this.usersRepository.update(id, { active: true });
        return { message: `User ${id} has been activated` };
    }
    async getSystemSettings() {
        return {
            smtp: {
                host: this.configService.get('smtp.host'),
                port: this.configService.get('smtp.port'),
                username: this.configService.get('smtp.username'),
                from_email: this.configService.get('smtp.fromEmail'),
                from_name: this.configService.get('smtp.fromName'),
            },
            telegram_bot_enabled: !!this.configService.get('telegram.botToken'),
            max_file_size_mb: this.configService.get('file.maxSizeMb'),
            allowed_file_types: this.configService.get('file.allowedTypes'),
            logo_url: this.configService.get('app.logoUrl'),
        };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService])
], AdminService);
//# sourceMappingURL=admin.service.js.map