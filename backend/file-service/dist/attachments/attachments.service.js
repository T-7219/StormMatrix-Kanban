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
exports.AttachmentsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const fs = require("fs");
const path = require("path");
let AttachmentsService = class AttachmentsService {
    constructor(configService) {
        this.configService = configService;
        this.uploadDir = this.configService.get('UPLOAD_DIR', '/app/uploads');
        if (!fs.existsSync(this.uploadDir)) {
            fs.mkdirSync(this.uploadDir, { recursive: true });
        }
    }
    async saveFile(file) {
        return {
            id: Math.random().toString(36).substring(2, 15),
            filename: file.filename,
            originalName: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
            path: file.path,
            createdAt: new Date().toISOString()
        };
    }
    async getFile(id) {
        return {
            id,
            filename: 'example.jpg',
            originalName: 'example.jpg',
            mimetype: 'image/jpeg',
            size: 12345,
            path: path.join(this.uploadDir, 'example.jpg'),
            createdAt: new Date().toISOString()
        };
    }
    async deleteFile(id) {
        return { deleted: true, id };
    }
};
exports.AttachmentsService = AttachmentsService;
exports.AttachmentsService = AttachmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AttachmentsService);
//# sourceMappingURL=attachments.service.js.map