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
exports.Column = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const board_entity_1 = require("../../boards/entities/board.entity");
const card_entity_1 = require("../../cards/entities/card.entity");
let Column = class Column {
};
exports.Column = Column;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    __metadata("design:type", String)
], Column.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: 'In Progress' }),
    __metadata("design:type", String)
], Column.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    (0, swagger_1.ApiProperty)({ example: 0 }),
    __metadata("design:type", Number)
], Column.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], Column.prototype, "isCompleted", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)({ example: 10, nullable: true }),
    __metadata("design:type", Number)
], Column.prototype, "cardLimit", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], Column.prototype, "archived", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    __metadata("design:type", String)
], Column.prototype, "boardId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => board_entity_1.Board, (board) => board.columns, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'boardId' }),
    __metadata("design:type", board_entity_1.Board)
], Column.prototype, "board", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => card_entity_1.Card, (card) => card.column),
    __metadata("design:type", Array)
], Column.prototype, "cards", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)({ example: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Column.prototype, "createdById", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, swagger_1.ApiProperty)({ example: '2023-01-01T00:00:00Z' }),
    __metadata("design:type", Date)
], Column.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, swagger_1.ApiProperty)({ example: '2023-01-01T00:00:00Z' }),
    __metadata("design:type", Date)
], Column.prototype, "updatedAt", void 0);
exports.Column = Column = __decorate([
    (0, typeorm_1.Entity)('columns')
], Column);
//# sourceMappingURL=column.entity.js.map