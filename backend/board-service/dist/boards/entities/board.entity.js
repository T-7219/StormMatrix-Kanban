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
exports.Board = exports.BoardBackground = exports.BoardVisibility = void 0;
const typeorm_1 = require("typeorm");
const column_entity_1 = require("../../columns/entities/column.entity");
const card_entity_1 = require("../../cards/entities/card.entity");
const label_entity_1 = require("../../labels/entities/label.entity");
var BoardVisibility;
(function (BoardVisibility) {
    BoardVisibility["PRIVATE"] = "private";
    BoardVisibility["TEAM"] = "team";
    BoardVisibility["PUBLIC"] = "public";
})(BoardVisibility || (exports.BoardVisibility = BoardVisibility = {}));
var BoardBackground;
(function (BoardBackground) {
    BoardBackground["COLOR"] = "color";
    BoardBackground["IMAGE"] = "image";
})(BoardBackground || (exports.BoardBackground = BoardBackground = {}));
let Board = class Board {
    addMember(userId) {
        if (!this.memberIds) {
            this.memberIds = [];
        }
        if (!this.memberIds.includes(userId)) {
            this.memberIds.push(userId);
        }
    }
    removeMember(userId) {
        if (this.memberIds && this.memberIds.includes(userId)) {
            this.memberIds = this.memberIds.filter(id => id !== userId);
        }
    }
    isMember(userId) {
        return this.memberIds?.includes(userId) || false;
    }
};
exports.Board = Board;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Board.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Board.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'text' }),
    __metadata("design:type", String)
], Board.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Board.prototype, "ownerId", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array'),
    __metadata("design:type", Array)
], Board.prototype, "memberIds", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: BoardVisibility,
        default: BoardVisibility.PRIVATE
    }),
    __metadata("design:type", String)
], Board.prototype, "visibility", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: BoardBackground,
        default: BoardBackground.COLOR
    }),
    __metadata("design:type", String)
], Board.prototype, "backgroundType", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '#0079bf' }),
    __metadata("design:type", String)
], Board.prototype, "backgroundColor", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Board.prototype, "backgroundImage", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Board.prototype, "starred", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Board.prototype, "archived", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => column_entity_1.Column, column => column.board, { cascade: true }),
    __metadata("design:type", Array)
], Board.prototype, "columns", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => card_entity_1.Card, card => card.board, { cascade: true }),
    __metadata("design:type", Array)
], Board.prototype, "cards", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => label_entity_1.Label, label => label.boardId, { cascade: true }),
    __metadata("design:type", Array)
], Board.prototype, "labels", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Board.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Board.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Board.prototype, "lastActivityAt", void 0);
exports.Board = Board = __decorate([
    (0, typeorm_1.Entity)('boards')
], Board);
//# sourceMappingURL=board.entity.js.map