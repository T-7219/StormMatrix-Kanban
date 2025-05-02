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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const microservices_1 = require("@nestjs/microservices");
const users_service_1 = require("../users/users.service");
const two_factor_auth_service_1 = require("../two-factor-auth/two-factor-auth.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService, configService, twoFactorAuthService, notificationClient) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.twoFactorAuthService = twoFactorAuthService;
        this.notificationClient = notificationClient;
    }
    async register(registerDto) {
        const existingUser = await this.usersService.findByEmail(registerDto.email);
        if (existingUser) {
            throw new common_1.BadRequestException('User with this email already exists');
        }
        const user = await this.usersService.create(registerDto);
        this.notificationClient.emit('user_registered', {
            userId: user.id,
            email: user.email,
            name: user.name,
            language: user.language,
        });
        const { password, twoFactorSecret, twoFactorRecoveryCodes, ...result } = user;
        return result;
    }
    async validateUser(email, password) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if (!user.active) {
            throw new common_1.UnauthorizedException('User account is inactive');
        }
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        await this.usersService.updateLastLogin(user.id);
        const { password: _, ...result } = user;
        return result;
    }
    async login(user) {
        if (user.twoFactorEnabled) {
            const temporaryToken = this.jwtService.sign({
                email: user.email,
                sub: user.id,
                isTwoFactorTemporaryToken: true
            }, {
                expiresIn: '5m',
            });
            return {
                requires2FA: true,
                temporaryToken,
            };
        }
        return this.generateTokens(user);
    }
    async refreshToken(refreshToken) {
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: this.configService.get('jwt.secret'),
            });
            const user = await this.usersService.findById(payload.sub);
            if (!user || !user.active) {
                throw new common_1.UnauthorizedException('Invalid refresh token');
            }
            return this.generateTokens(user);
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
    async verify2FA(userId, code) {
        const user = await this.usersService.findById(userId);
        if (!user || !user.twoFactorEnabled) {
            throw new common_1.UnauthorizedException('Two-factor authentication is not enabled');
        }
        const isValid = await this.twoFactorAuthService.verifyToken(user.twoFactorSecret, code);
        if (!isValid) {
            throw new common_1.UnauthorizedException('Invalid two-factor authentication code');
        }
        return this.generateTokens(user);
    }
    generateTokens(user) {
        const payload = { email: user.email, sub: user.id, roles: user.roles };
        return {
            access_token: this.jwtService.sign(payload),
            refresh_token: this.jwtService.sign(payload, {
                expiresIn: this.configService.get('jwt.refreshExpiresIn'),
            }),
            token_type: 'Bearer',
            expires_in: parseInt(this.configService.get('jwt.expiresIn'), 10),
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        };
    }
    async logout(userId) {
        return { message: 'Successfully logged out' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(4, (0, common_1.Inject)('NOTIFICATION_SERVICE')),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        config_1.ConfigService,
        two_factor_auth_service_1.TwoFactorAuthService,
        microservices_1.ClientProxy])
], AuthService);
//# sourceMappingURL=auth.service.js.map