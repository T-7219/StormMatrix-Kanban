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
exports.Card = exports.CardPriority = void 0;
const typeorm_1 = require("typeorm");
const board_entity_1 = require("../../boards/entities/board.entity");
const column_entity_1 = require("../../columns/entities/column.entity");
const label_entity_1 = require("../../labels/entities/label.entity");
const swagger_1 = require("@nestjs/swagger");
var CardPriority;
(function (CardPriority) {
    CardPriority["LOW"] = "low";
    CardPriority["MEDIUM"] = "medium";
    CardPriority["HIGH"] = "high";
    CardPriority["URGENT"] = "urgent";
})(CardPriority || (exports.CardPriority = CardPriority = {}));
let Card = class Card {
    addAssignee(userId) {
        if (!this.assigneeIds) {
            this.assigneeIds = [];
        }
        if (!this.assigneeIds.includes(userId)) {
            this.assigneeIds.push(userId);
        }
    }
    removeAssignee(userId) {
        if (this.assigneeIds && this.assigneeIds.includes(userId)) {
            this.assigneeIds = this.assigneeIds.filter(id => id !== userId);
        }
    }
    addWatcher(userId) {
        if (!this.watcherIds) {
            this.watcherIds = [];
        }
        if (!this.watcherIds.includes(userId)) {
            this.watcherIds.push(userId);
        }
    }
    removeWatcher(userId) {
        if (this.watcherIds && this.watcherIds.includes(userId)) {
            this.watcherIds = this.watcherIds.filter(id => id !== userId);
        }
    }
    addMember(userId) {
        if (!this.assigneeIds) {
            this.assigneeIds = [];
        }
        if (!this.assigneeIds.includes(userId)) {
            this.assigneeIds.push(userId);
        }
    }
    removeMember(userId) {
        if (this.assigneeIds && this.assigneeIds.includes(userId)) {
            this.assigneeIds = this.assigneeIds.filter(id => id !== userId);
        }
    }
    isMember(userId) {
        return this.assigneeIds?.includes(userId) || false;
    }
};
exports.Card = Card;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    __metadata("design:type", String)
], Card.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)({ example: 'Implement login feature' }),
    __metadata("design:type", String)
], Card.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'text' }),
    (0, swagger_1.ApiProperty)({
        example: 'Create login form and API endpoint',
        nullable: true
    }),
    __metadata("design:type", String)
], Card.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)({ example: '2023-12-31T23:59:59Z', nullable: true }),
    __metadata("design:type", Date)
], Card.prototype, "dueDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    (0, swagger_1.ApiProperty)({ example: 0 }),
    __metadata("design:type", Number)
], Card.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], Card.prototype, "archived", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)({ example: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Card.prototype, "coverImage", void 0);
__decorate([
    (0, typeorm_1.Column)({ enum: CardPriority, default: CardPriority.MEDIUM }),
    __metadata("design:type", String)
], Card.prototype, "priority", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', { default: '' }),
    __metadata("design:type", Array)
], Card.prototype, "assigneeIds", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', { default: '' }),
    __metadata("design:type", Array)
], Card.prototype, "watcherIds", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)({ example: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Card.prototype, "createdById", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Card.prototype, "estimatedTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Card.prototype, "spentTime", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Index)(),
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    __metadata("design:type", String)
], Card.prototype, "boardId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => board_entity_1.Board, board => board.cards, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'boardId' }),
    __metadata("design:type", board_entity_1.Board)
], Card.prototype, "board", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.Index)(),
    (0, swagger_1.ApiProperty)({ example: 'uuid' }),
    __metadata("design:type", String)
], Card.prototype, "columnId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => column_entity_1.Column, column => column.cards, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'columnId' }),
    __metadata("design:type", column_entity_1.Column)
], Card.prototype, "column", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => label_entity_1.Label),
    (0, typeorm_1.JoinTable)({
        name: 'card_labels',
        joinColumn: { name: 'card_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'label_id', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], Card.prototype, "labels", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', { default: '' }),
    __metadata("design:type", Array)
], Card.prototype, "attachmentIds", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], Card.prototype, "completed", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)({ example: '2023-01-01T00:00:00Z', nullable: true }),
    __metadata("design:type", Date)
], Card.prototype, "completedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)({ example: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Card.prototype, "completedById", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, swagger_1.ApiProperty)({ example: '2023-01-01T00:00:00Z' }),
    __metadata("design:type", Date)
], Card.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, swagger_1.ApiProperty)({ example: '2023-01-01T00:00:00Z' }),
    __metadata("design:type", Date)
], Card.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, swagger_1.ApiProperty)({ example: '2023-01-01T00:00:00Z', nullable: true }),
    __metadata("design:type", Date)
], Card.prototype, "lastActivityAt", void 0);
exports.Card = Card = __decorate([
    (0, typeorm_1.Entity)('cards')
], Card);
//# sourceMappingURL=card.entity.js.map