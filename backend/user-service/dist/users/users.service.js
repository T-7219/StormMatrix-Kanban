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
const uuid_1 = require("uuid");
const messaging_service_1 = require("../messaging/messaging.service");
let UsersService = class UsersService {
    constructor(userProfileRepository, messagingService) {
        this.userProfileRepository = userProfileRepository;
        this.messagingService = messagingService;
    }
    async getUserProfile(userId) {
        let profile = await this.userProfileRepository.findOne({ where: { userId } });
        if (!profile) {
            profile = await this.createDefaultProfile(userId);
        }
        return profile;
    }
    async createDefaultProfile(userId) {
        const newProfile = this.userProfileRepository.create({
            userId,
            language: user_entity_1.UserLanguage.EN,
            theme: user_entity_1.UserTheme.SYSTEM,
            emailNotifications: true,
            notificationPreferences: {
                assignments: user_entity_1.NotificationChannels.EMAIL,
                mentions: user_entity_1.NotificationChannels.EMAIL,
                dueDates: user_entity_1.NotificationChannels.EMAIL,
                boardInvites: user_entity_1.NotificationChannels.EMAIL,
                comments: user_entity_1.NotificationChannels.IN_APP,
            },
            uiPreferences: {
                compactView: false,
                showDescriptionInCards: true,
                showLabelsInCards: true,
                defaultBoardView: 'kanban',
            },
            savedFilters: [],
            onboardingCompleted: false,
        });
        return this.userProfileRepository.save(newProfile);
    }
    async updateProfile(userId, updateProfileDto) {
        const profile = await this.getUserProfile(userId);
        Object.assign(profile, updateProfileDto);
        const updatedProfile = await this.userProfileRepository.save(profile);
        if (this.messagingService) {
            await this.messagingService.sendUserProfileUpdated(userId, {
                displayName: updatedProfile.displayName,
                avatarUrl: updatedProfile.avatarUrl,
                language: updatedProfile.language
            });
        }
        return updatedProfile;
    }
    async saveFilter(userId, savedFilterDto) {
        const profile = await this.getUserProfile(userId);
        const savedFilters = [...profile.savedFilters];
        if (savedFilterDto.id) {
            const filterIndex = savedFilters.findIndex(filter => filter.id === savedFilterDto.id);
            if (filterIndex === -1) {
                throw new common_1.NotFoundException(`Filter with ID ${savedFilterDto.id} not found`);
            }
            savedFilters[filterIndex] = {
                ...savedFilters[filterIndex],
                name: savedFilterDto.name,
                filter: savedFilterDto.filter
            };
        }
        else {
            savedFilters.push({
                id: (0, uuid_1.v4)(),
                name: savedFilterDto.name,
                filter: savedFilterDto.filter
            });
        }
        profile.savedFilters = savedFilters;
        return this.userProfileRepository.save(profile);
    }
    async deleteFilter(userId, filterId) {
        const profile = await this.getUserProfile(userId);
        const savedFilters = profile.savedFilters;
        const filterIndex = savedFilters.findIndex(filter => filter.id === filterId);
        if (filterIndex === -1) {
            throw new common_1.NotFoundException(`Filter with ID ${filterId} not found`);
        }
        profile.savedFilters = savedFilters.filter(filter => filter.id !== filterId);
        return this.userProfileRepository.save(profile);
    }
    async updateAvatar(userId, avatarUrl) {
        const profile = await this.getUserProfile(userId);
        profile.avatarUrl = avatarUrl;
        const updatedProfile = await this.userProfileRepository.save(profile);
        if (this.messagingService) {
            await this.messagingService.sendUserProfileUpdated(userId, {
                avatarUrl: updatedProfile.avatarUrl
            });
        }
        return updatedProfile;
    }
    async updateLanguage(userId, language) {
        if (!Object.values(user_entity_1.UserLanguage).includes(language)) {
            throw new common_1.BadRequestException(`Invalid language: ${language}`);
        }
        const profile = await this.getUserProfile(userId);
        profile.language = language;
        const updatedProfile = await this.userProfileRepository.save(profile);
        if (this.messagingService) {
            await this.messagingService.sendUserPreferenceChanged(userId, 'language', {
                language: updatedProfile.language
            });
        }
        return updatedProfile;
    }
    async updateTheme(userId, theme) {
        if (!Object.values(user_entity_1.UserTheme).includes(theme)) {
            throw new common_1.BadRequestException(`Invalid theme: ${theme}`);
        }
        const profile = await this.getUserProfile(userId);
        profile.theme = theme;
        const updatedProfile = await this.userProfileRepository.save(profile);
        if (this.messagingService) {
            await this.messagingService.sendUserPreferenceChanged(userId, 'theme', {
                theme: updatedProfile.theme
            });
        }
        return updatedProfile;
    }
    async completeOnboarding(userId) {
        const profile = await this.getUserProfile(userId);
        profile.onboardingCompleted = true;
        const updatedProfile = await this.userProfileRepository.save(profile);
        if (this.messagingService) {
            await this.messagingService.sendUserProfileUpdated(userId, {
                onboardingCompleted: true
            });
            await this.messagingService.sendNotificationToUser(userId, 'onboarding_completed', {
                message: 'Welcome to StormMatrix Kanban! Your onboarding is now complete.'
            });
        }
        return updatedProfile;
    }
    async getUserProfilesByIds(userIds) {
        return this.userProfileRepository.find({
            where: {
                userId: (0, typeorm_2.In)(userIds),
            },
        });
    }
    async createUserProfile(createProfileDto) {
        const existingProfile = await this.userProfileRepository.findOne({
            where: { userId: createProfileDto.userId }
        });
        if (existingProfile) {
            throw new common_1.BadRequestException(`Profile for user ${createProfileDto.userId} already exists`);
        }
        const newProfile = this.userProfileRepository.create({
            userId: createProfileDto.userId,
            displayName: createProfileDto.displayName || createProfileDto.email.split('@')[0],
            language: createProfileDto.language || user_entity_1.UserLanguage.EN,
            theme: user_entity_1.UserTheme.SYSTEM,
            emailNotifications: true,
            notificationPreferences: {
                assignments: user_entity_1.NotificationChannels.EMAIL,
                mentions: user_entity_1.NotificationChannels.EMAIL,
                dueDates: user_entity_1.NotificationChannels.EMAIL,
                boardInvites: user_entity_1.NotificationChannels.EMAIL,
                comments: user_entity_1.NotificationChannels.IN_APP,
            },
            uiPreferences: {
                compactView: false,
                showDescriptionInCards: true,
                showLabelsInCards: true,
                defaultBoardView: 'kanban',
            },
            savedFilters: [],
            onboardingCompleted: false,
        });
        const createdProfile = await this.userProfileRepository.save(newProfile);
        if (this.messagingService) {
            await this.messagingService.sendUserProfileUpdated(createProfileDto.userId, {
                displayName: createdProfile.displayName,
                language: createdProfile.language
            });
            await this.messagingService.sendNotificationToUser(createProfileDto.userId, 'profile_created', {
                message: 'Welcome to StormMatrix Kanban! Your profile has been created.'
            });
        }
        return createdProfile;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserProfile)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => messaging_service_1.MessagingService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        messaging_service_1.MessagingService])
], UsersService);
//# sourceMappingURL=users.service.js.map