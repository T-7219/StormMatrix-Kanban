"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
let NotificationsService = class NotificationsService {
    async findAll() {
        return [
            {
                id: '1',
                userId: 'sample-user-id',
                message: 'Вы были добавлены на доску',
                read: false,
                createdAt: new Date().toISOString(),
            },
            {
                id: '2',
                userId: 'sample-user-id',
                message: 'На вас назначена новая карточка',
                read: true,
                createdAt: new Date().toISOString(),
            },
        ];
    }
    async countUnread() {
        return { count: 1 };
    }
    async markAsRead(id) {
        return {
            id,
            read: true,
            updatedAt: new Date().toISOString()
        };
    }
    async markAllAsRead() {
        return {
            success: true,
            count: 1,
            updatedAt: new Date().toISOString()
        };
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)()
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map