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
exports.UpdateProfileDto = exports.UiPreferencesDto = exports.NotificationPreferencesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const user_entity_1 = require("../entities/user.entity");
const class_transformer_1 = require("class-transformer");
class NotificationPreferencesDto {
}
exports.NotificationPreferencesDto = NotificationPreferencesDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: user_entity_1.NotificationChannels }),
    (0, class_validator_1.IsEnum)(user_entity_1.NotificationChannels),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], NotificationPreferencesDto.prototype, "assignments", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: user_entity_1.NotificationChannels }),
    (0, class_validator_1.IsEnum)(user_entity_1.NotificationChannels),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], NotificationPreferencesDto.prototype, "mentions", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: user_entity_1.NotificationChannels }),
    (0, class_validator_1.IsEnum)(user_entity_1.NotificationChannels),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], NotificationPreferencesDto.prototype, "dueDates", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: user_entity_1.NotificationChannels }),
    (0, class_validator_1.IsEnum)(user_entity_1.NotificationChannels),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], NotificationPreferencesDto.prototype, "boardInvites", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: user_entity_1.NotificationChannels }),
    (0, class_validator_1.IsEnum)(user_entity_1.NotificationChannels),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], NotificationPreferencesDto.prototype, "comments", void 0);
class UiPreferencesDto {
}
exports.UiPreferencesDto = UiPreferencesDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UiPreferencesDto.prototype, "compactView", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UiPreferencesDto.prototype, "showDescriptionInCards", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UiPreferencesDto.prototype, "showLabelsInCards", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UiPreferencesDto.prototype, "defaultBoardView", void 0);
class UpdateProfileDto {
}
exports.UpdateProfileDto = UpdateProfileDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Display name of the user' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "displayName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'User bio or description' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(1000),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "bio", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'URL to the user\'s avatar image' }),
    (0, class_validator_1.IsUrl)({}, { message: 'Avatar URL must be a valid URL' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "avatarUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'User\'s position or job title' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'User\'s company' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "company", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'User\'s location' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'User\'s website' }),
    (0, class_validator_1.IsUrl)({}, { message: 'Website must be a valid URL' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "website", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: user_entity_1.UserLanguage, description: 'User\'s preferred language' }),
    (0, class_validator_1.IsEnum)(user_entity_1.UserLanguage),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "language", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: user_entity_1.UserTheme, description: 'User\'s preferred theme' }),
    (0, class_validator_1.IsEnum)(user_entity_1.UserTheme),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "theme", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Whether the user wants to receive email notifications' }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateProfileDto.prototype, "emailNotifications", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: NotificationPreferencesDto, description: 'User\'s notification preferences' }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => NotificationPreferencesDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", NotificationPreferencesDto)
], UpdateProfileDto.prototype, "notificationPreferences", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: UiPreferencesDto, description: 'User\'s UI preferences' }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => UiPreferencesDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", UiPreferencesDto)
], UpdateProfileDto.prototype, "uiPreferences", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Whether the user has completed onboarding' }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateProfileDto.prototype, "onboardingCompleted", void 0);
//# sourceMappingURL=update-profile.dto.js.map