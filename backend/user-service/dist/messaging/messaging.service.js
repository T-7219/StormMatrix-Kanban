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
var MessagingService_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagingService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
let MessagingService = MessagingService_1 = class MessagingService {
    constructor(userClient, notificationClient) {
        this.userClient = userClient;
        this.notificationClient = notificationClient;
        this.logger = new common_1.Logger(MessagingService_1.name);
    }
    async sendUserProfileUpdated(userId, profileData) {
        try {
            this.userClient.emit('user_profile_updated', {
                userId,
                profileData,
                timestamp: new Date().toISOString(),
            });
            this.logger.log(`Sent user_profile_updated event for user ${userId}`);
        }
        catch (error) {
            this.logger.error(`Failed to emit user_profile_updated: ${error.message}`, error.stack);
        }
    }
    async sendUserPreferenceChanged(userId, preferenceType, preferenceData) {
        try {
            this.userClient.emit('user_preference_changed', {
                userId,
                preferenceType,
                preferenceData,
                timestamp: new Date().toISOString(),
            });
            this.logger.log(`Sent user_preference_changed event for user ${userId}`);
        }
        catch (error) {
            this.logger.error(`Failed to emit user_preference_changed: ${error.message}`, error.stack);
        }
    }
    async sendNotificationToUser(userId, notificationType, data) {
        try {
            this.notificationClient.emit('send_notification', {
                userId,
                type: notificationType,
                data,
                timestamp: new Date().toISOString(),
            });
            this.logger.log(`Sent notification to user ${userId} of type ${notificationType}`);
        }
        catch (error) {
            this.logger.error(`Failed to send notification: ${error.message}`, error.stack);
        }
    }
};
exports.MessagingService = MessagingService;
exports.MessagingService = MessagingService = MessagingService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('USER_SERVICE')),
    __param(1, (0, common_1.Inject)('NOTIFICATION_SERVICE')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object, typeof (_b = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _b : Object])
], MessagingService);
//# sourceMappingURL=messaging.service.js.map