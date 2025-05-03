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
exports.UserProfile = exports.NotificationChannels = exports.UserTheme = exports.UserLanguage = void 0;
const typeorm_1 = require("typeorm");
var UserLanguage;
(function (UserLanguage) {
    UserLanguage["EN"] = "en";
    UserLanguage["RU"] = "ru";
    UserLanguage["DE"] = "de";
})(UserLanguage || (exports.UserLanguage = UserLanguage = {}));
var UserTheme;
(function (UserTheme) {
    UserTheme["LIGHT"] = "light";
    UserTheme["DARK"] = "dark";
    UserTheme["SYSTEM"] = "system";
})(UserTheme || (exports.UserTheme = UserTheme = {}));
var NotificationChannels;
(function (NotificationChannels) {
    NotificationChannels["EMAIL"] = "email";
    NotificationChannels["IN_APP"] = "in_app";
    NotificationChannels["NONE"] = "none";
})(NotificationChannels || (exports.NotificationChannels = NotificationChannels = {}));
let UserProfile = class UserProfile {
};
exports.UserProfile = UserProfile;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], UserProfile.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], UserProfile.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, length: 255 }),
    __metadata("design:type", String)
], UserProfile.prototype, "displayName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, length: 1000 }),
    __metadata("design:type", String)
], UserProfile.prototype, "bio", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserProfile.prototype, "avatarUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, length: 255 }),
    __metadata("design:type", String)
], UserProfile.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, length: 255 }),
    __metadata("design:type", String)
], UserProfile.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, length: 255 }),
    __metadata("design:type", String)
], UserProfile.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, length: 255 }),
    __metadata("design:type", String)
], UserProfile.prototype, "website", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: UserLanguage.EN, type: 'enum', enum: UserLanguage }),
    __metadata("design:type", String)
], UserProfile.prototype, "language", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: UserTheme.SYSTEM, type: 'enum', enum: UserTheme }),
    __metadata("design:type", String)
], UserProfile.prototype, "theme", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], UserProfile.prototype, "emailNotifications", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', default: {} }),
    __metadata("design:type", Object)
], UserProfile.prototype, "notificationPreferences", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', default: {} }),
    __metadata("design:type", Object)
], UserProfile.prototype, "uiPreferences", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', default: [] }),
    __metadata("design:type", Array)
], UserProfile.prototype, "savedFilters", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], UserProfile.prototype, "onboardingCompleted", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UserProfile.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], UserProfile.prototype, "updatedAt", void 0);
exports.UserProfile = UserProfile = __decorate([
    (0, typeorm_1.Entity)('user_profiles')
], UserProfile);
//# sourceMappingURL=user.entity.js.map