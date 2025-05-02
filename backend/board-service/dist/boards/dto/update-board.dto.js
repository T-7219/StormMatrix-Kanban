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
exports.UpdateBoardDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const board_entity_1 = require("../entities/board.entity");
class UpdateBoardDto {
}
exports.UpdateBoardDto = UpdateBoardDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'The name of the board', example: 'Updated Development Roadmap' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], UpdateBoardDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'A description of the board', example: 'Updated description for tracking development tasks' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(1000),
    __metadata("design:type", String)
], UpdateBoardDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Board visibility setting',
        enum: board_entity_1.BoardVisibility,
        example: board_entity_1.BoardVisibility.TEAM
    }),
    (0, class_validator_1.IsEnum)(board_entity_1.BoardVisibility),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateBoardDto.prototype, "visibility", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Background type (color or image)',
        enum: board_entity_1.BoardBackground,
        example: board_entity_1.BoardBackground.IMAGE
    }),
    (0, class_validator_1.IsEnum)(board_entity_1.BoardBackground),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateBoardDto.prototype, "backgroundType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Background color in hex format',
        example: '#8e44ad'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateBoardDto.prototype, "backgroundColor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'URL to background image',
        example: 'https://example.com/new-background.jpg'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateBoardDto.prototype, "backgroundImage", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Whether the board is starred',
        example: true
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateBoardDto.prototype, "starred", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Whether the board is archived',
        example: true
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateBoardDto.prototype, "archived", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'List of member IDs',
        example: ['user1-id', 'user2-id']
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateBoardDto.prototype, "memberIds", void 0);
//# sourceMappingURL=update-board.dto.js.map