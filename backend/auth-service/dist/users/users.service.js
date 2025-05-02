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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const config_1 = require("@nestjs/config");
let UsersService = class UsersService {
    constructor(usersRepository, configService) {
        this.usersRepository = usersRepository;
        this.configService = configService;
        this.createAdminIfNoUsers();
    }
    async findByEmail(email) {
        return this.usersRepository.findOne({ where: { email } });
    }
    async findById(id) {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }
    async create(registerDto) {
        const user = this.usersRepository.create({
            ...registerDto,
            roles: ['user'],
            active: true,
        });
        return this.usersRepository.save(user);
    }
    async updateLastLogin(id) {
        await this.usersRepository.update(id, {
            lastLoginAt: new Date()
        });
    }
    async updateTwoFactorSecret(userId, secret) {
        await this.usersRepository.update(userId, { twoFactorSecret: secret });
        return this.findById(userId);
    }
    async enableTwoFactor(userId, recoveryCodes) {
        await this.usersRepository.update(userId, {
            twoFactorEnabled: true,
            twoFactorRecoveryCodes: recoveryCodes
        });
        return this.findById(userId);
    }
    async disableTwoFactor(userId) {
        await this.usersRepository.update(userId, {
            twoFactorEnabled: false,
            twoFactorSecret: null,
            twoFactorRecoveryCodes: []
        });
        return this.findById(userId);
    }
    async createAdminIfNoUsers() {
        const usersCount = await this.usersRepository.count();
        if (usersCount === 0) {
            const adminEmail = this.configService.get('admin.email');
            const adminPassword = this.configService.get('admin.password');
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
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService])
], UsersService);
//# sourceMappingURL=users.service.js.map