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
exports.CreateBoardDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const board_entity_1 = require("../entities/board.entity");
class CreateBoardDto {
    constructor() {
        this.visibility = board_entity_1.BoardVisibility.PRIVATE;
        this.backgroundType = board_entity_1.BoardBackground.COLOR;
    }
}
exports.CreateBoardDto = CreateBoardDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Development Roadmap' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateBoardDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Board for tracking development tasks and milestones' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateBoardDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: board_entity_1.BoardVisibility, default: board_entity_1.BoardVisibility.PRIVATE }),
    (0, class_validator_1.IsEnum)(board_entity_1.BoardVisibility),
    __metadata("design:type", String)
], CreateBoardDto.prototype, "visibility", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: board_entity_1.BoardBackground, default: board_entity_1.BoardBackground.COLOR }),
    (0, class_validator_1.IsEnum)(board_entity_1.BoardBackground),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateBoardDto.prototype, "backgroundType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '#0079bf' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateBoardDto.prototype, "backgroundColor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://example.com/background.jpg' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateBoardDto.prototype, "backgroundImage", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: ['Backlog', 'To Do', 'In Progress', 'Review', 'Done'] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateBoardDto.prototype, "initialColumns", void 0);
//# sourceMappingURL=create-board.dto.js.map