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
var MessagingController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagingController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const users_service_1 = require("../users/users.service");
let MessagingController = MessagingController_1 = class MessagingController {
    constructor(usersService) {
        this.usersService = usersService;
        this.logger = new common_1.Logger(MessagingController_1.name);
    }
    async handleUserCreated(data) {
        try {
            this.logger.log(`Received user_created event: ${JSON.stringify(data)}`);
            await this.usersService.createUserProfile({
                userId: data.userId,
                email: data.email,
                displayName: data.name || data.email.split('@')[0],
                language: data.language || undefined
            });
            this.logger.log(`Created profile for user ${data.userId}`);
        }
        catch (error) {
            this.logger.error(`Error handling user_created event: ${error.message}`, error.stack);
        }
    }
    async handleUserUpdated(data) {
        try {
            this.logger.log(`Received user_updated event: ${JSON.stringify(data)}`);
            const profile = await this.usersService.getUserProfile(data.userId);
            if (profile) {
                const updateData = {};
                if (!profile.displayName && data.name) {
                    updateData.displayName = data.name;
                }
                if (Object.keys(updateData).length > 0) {
                    await this.usersService.updateProfile(data.userId, updateData);
                    this.logger.log(`Updated profile for user ${data.userId}`);
                }
            }
        }
        catch (error) {
            this.logger.error(`Error handling user_updated event: ${error.message}`, error.stack);
        }
    }
    async handleUserDeleted(data) {
        try {
            this.logger.log(`Received user_deleted event for user ${data.userId}`);
            this.logger.log(`User ${data.userId} has been deleted in auth service. Consider archiving their profile.`);
        }
        catch (error) {
            this.logger.error(`Error handling user_deleted event: ${error.message}`, error.stack);
        }
    }
};
exports.MessagingController = MessagingController;
__decorate([
    (0, microservices_1.EventPattern)('user_created'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessagingController.prototype, "handleUserCreated", null);
__decorate([
    (0, microservices_1.EventPattern)('user_updated'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessagingController.prototype, "handleUserUpdated", null);
__decorate([
    (0, microservices_1.EventPattern)('user_deleted'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessagingController.prototype, "handleUserDeleted", null);
exports.MessagingController = MessagingController = MessagingController_1 = __decorate([
    (0, common_1.Controller)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => users_service_1.UsersService))),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], MessagingController);
//# sourceMappingURL=messaging.controller.js.map