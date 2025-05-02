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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwoFactorAuthService = void 0;
const common_1 = require("@nestjs/common");
const otplib_1 = require("otplib");
const qrcode_1 = require("qrcode");
const users_service_1 = require("../users/users.service");
const crypto = require("crypto");
let TwoFactorAuthService = class TwoFactorAuthService {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async generateTwoFactorAuthSecret(userId) {
        const user = await this.usersService.findById(userId);
        const secret = otplib_1.authenticator.generateSecret();
        const appName = 'StormMatrix Kanban';
        const otpauthUrl = otplib_1.authenticator.keyuri(user.email, appName, secret);
        await this.usersService.updateTwoFactorSecret(user.id, secret);
        const qrCodeDataURL = await (0, qrcode_1.toDataURL)(otpauthUrl);
        const recoveryCodes = this.generateRecoveryCodes();
        return {
            secret,
            qrCode: qrCodeDataURL,
            recoveryCodes,
        };
    }
    async enableTwoFactorAuth(userId, code) {
        const user = await this.usersService.findById(userId);
        const isCodeValid = this.verifyToken(user.twoFactorSecret, code);
        if (!isCodeValid) {
            return false;
        }
        const recoveryCodes = this.generateRecoveryCodes();
        await this.usersService.enableTwoFactor(user.id, recoveryCodes);
        return true;
    }
    verifyToken(twoFactorSecret, token) {
        if (!twoFactorSecret) {
            return false;
        }
        return otplib_1.authenticator.verify({
            token,
            secret: twoFactorSecret,
        });
    }
    async verifyWithRecoveryCode(userId, recoveryCode) {
        const user = await this.usersService.findById(userId);
        const { twoFactorRecoveryCodes } = user;
        const codeIndex = twoFactorRecoveryCodes.indexOf(recoveryCode);
        if (codeIndex === -1) {
            return false;
        }
        const updatedCodes = [
            ...twoFactorRecoveryCodes.slice(0, codeIndex),
            ...twoFactorRecoveryCodes.slice(codeIndex + 1),
        ];
        await this.usersService.enableTwoFactor(user.id, updatedCodes);
        return true;
    }
    generateRecoveryCodes() {
        return Array.from({ length: 10 }, () => crypto.randomBytes(4).toString('hex'));
    }
};
exports.TwoFactorAuthService = TwoFactorAuthService;
exports.TwoFactorAuthService = TwoFactorAuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], TwoFactorAuthService);
//# sourceMappingURL=two-factor-auth.service.js.map