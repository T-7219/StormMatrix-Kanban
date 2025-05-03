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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_service_1 = require("./users.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const update_profile_dto_1 = require("./dto/update-profile.dto");
const saved_filter_dto_1 = require("./dto/saved-filter.dto");
const user_entity_1 = require("./entities/user.entity");
const get_users_by_ids_dto_1 = require("./dto/get-users-by-ids.dto");
const create_profile_dto_1 = require("./dto/create-profile.dto");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async getProfile(req) {
        return this.usersService.getUserProfile(req.user.sub);
    }
    async updateProfile(req, updateProfileDto) {
        return this.usersService.updateProfile(req.user.sub, updateProfileDto);
    }
    async updateAvatar(req, avatarUrl) {
        return this.usersService.updateAvatar(req.user.sub, avatarUrl);
    }
    async updateLanguage(req, language) {
        return this.usersService.updateLanguage(req.user.sub, language);
    }
    async updateTheme(req, theme) {
        return this.usersService.updateTheme(req.user.sub, theme);
    }
    async saveFilter(req, savedFilterDto) {
        return this.usersService.saveFilter(req.user.sub, savedFilterDto);
    }
    async deleteFilter(req, filterId) {
        return this.usersService.deleteFilter(req.user.sub, filterId);
    }
    async completeOnboarding(req) {
        return this.usersService.completeOnboarding(req.user.sub);
    }
    async getUsersByIds(getUsersByIdsDto) {
        return this.usersService.getUserProfilesByIds(getUsersByIdsDto.userIds);
    }
    async createProfile(createProfileDto) {
        return this.usersService.createUserProfile(createProfileDto);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)('profile'),
    (0, swagger_1.ApiOperation)({ summary: 'Get current user profile' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns the user\'s profile' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Put)('profile'),
    (0, swagger_1.ApiOperation)({ summary: 'Update current user profile' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Profile updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request - Invalid data' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_profile_dto_1.UpdateProfileDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Post)('profile/avatar'),
    (0, swagger_1.ApiOperation)({ summary: 'Update user avatar' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Avatar updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request - Invalid URL' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)('avatarUrl')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateAvatar", null);
__decorate([
    (0, common_1.Patch)('profile/language'),
    (0, swagger_1.ApiOperation)({ summary: 'Update user language preference' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Language preference updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request - Invalid language' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)('language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateLanguage", null);
__decorate([
    (0, common_1.Patch)('profile/theme'),
    (0, swagger_1.ApiOperation)({ summary: 'Update user theme preference' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Theme preference updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request - Invalid theme' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)('theme')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateTheme", null);
__decorate([
    (0, common_1.Post)('profile/filters'),
    (0, swagger_1.ApiOperation)({ summary: 'Save a filter' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Filter saved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request - Invalid filter data' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not Found - When updating non-existent filter' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, saved_filter_dto_1.SavedFilterDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "saveFilter", null);
__decorate([
    (0, common_1.Delete)('profile/filters/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a saved filter' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Filter ID to delete' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Filter deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not Found - Filter not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteFilter", null);
__decorate([
    (0, common_1.Post)('profile/onboarding/complete'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark user onboarding as completed' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Onboarding marked as completed' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "completeOnboarding", null);
__decorate([
    (0, common_1.Post)('by-ids'),
    (0, swagger_1.ApiOperation)({ summary: 'Get multiple user profiles by their IDs' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns a list of user profiles' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request - Invalid ID format' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_users_by_ids_dto_1.GetUsersByIdsDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUsersByIds", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new user profile' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'User profile created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request - Profile already exists or invalid data' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_profile_dto_1.CreateProfileDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createProfile", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('users'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map