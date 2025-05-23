"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwoFactorAuthModule = void 0;
const common_1 = require("@nestjs/common");
const two_factor_auth_service_1 = require("./two-factor-auth.service");
const users_module_1 = require("../users/users.module");
let TwoFactorAuthModule = class TwoFactorAuthModule {
};
exports.TwoFactorAuthModule = TwoFactorAuthModule;
exports.TwoFactorAuthModule = TwoFactorAuthModule = __decorate([
    (0, common_1.Module)({
        imports: [users_module_1.UsersModule],
        providers: [two_factor_auth_service_1.TwoFactorAuthService],
        exports: [two_factor_auth_service_1.TwoFactorAuthService],
    })
], TwoFactorAuthModule);
//# sourceMappingURL=two-factor-auth.module.js.map