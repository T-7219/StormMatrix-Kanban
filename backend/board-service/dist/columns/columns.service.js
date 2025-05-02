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
exports.ColumnsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const column_entity_1 = require("./entities/column.entity");
const boards_service_1 = require("../boards/boards.service");
let ColumnsService = class ColumnsService {
    constructor(columnRepository, boardsService) {
        this.columnRepository = columnRepository;
        this.boardsService = boardsService;
    }
    async create(createColumnDto, userId) {
        const board = await this.boardsService.findOne(createColumnDto.boardId, userId);
        if (createColumnDto.position === undefined) {
            const lastColumn = await this.columnRepository.findOne({
                where: { boardId: createColumnDto.boardId },
                order: { position: 'DESC' },
            });
            createColumnDto.position = lastColumn ? lastColumn.position + 1 : 0;
        }
        const column = this.columnRepository.create({
            ...createColumnDto,
            createdById: userId,
        });
        return this.columnRepository.save(column);
    }
    async findAll(boardId, userId) {
        await this.boardsService.findOne(boardId, userId);
        return this.columnRepository.find({
            where: { boardId, archived: false },
            order: { position: 'ASC' },
            relations: ['cards'],
        });
    }
    async findOne(id, userId) {
        const column = await this.columnRepository.findOne({
            where: { id },
            relations: ['cards'],
        });
        if (!column) {
            throw new common_1.NotFoundException(`Column with ID ${id} not found`);
        }
        await this.boardsService.findOne(column.boardId, userId);
        return column;
    }
    async update(id, updateColumnDto, userId) {
        const column = await this.findOne(id, userId);
        if (updateColumnDto.position !== undefined && updateColumnDto.position !== column.position) {
            await this.updateColumnPositions(column.boardId, column.position, updateColumnDto.position);
        }
        await this.columnRepository.update(id, updateColumnDto);
        return this.findOne(id, userId);
    }
    async remove(id, userId) {
        const column = await this.findOne(id, userId);
        if (column.cards && column.cards.length > 0) {
            throw new common_1.BadRequestException('Cannot delete column that contains cards');
        }
        await this.columnRepository.remove(column);
    }
    async archiveColumn(id, userId) {
        const column = await this.findOne(id, userId);
        column.archived = true;
        await this.columnRepository.save(column);
        return column;
    }
    async unarchiveColumn(id, userId) {
        const column = await this.findOne(id, userId);
        column.archived = false;
        await this.columnRepository.save(column);
        return column;
    }
    async moveColumn(id, newPosition, userId) {
        const column = await this.findOne(id, userId);
        if (newPosition === column.position) {
            return column;
        }
        await this.updateColumnPositions(column.boardId, column.position, newPosition);
        column.position = newPosition;
        await this.columnRepository.save(column);
        return this.findOne(id, userId);
    }
    async updateColumnPositions(boardId, oldPosition, newPosition) {
        const columns = await this.columnRepository.find({
            where: { boardId, archived: false },
            order: { position: 'ASC' },
        });
        if (oldPosition < newPosition) {
            for (const column of columns) {
                if (column.position > oldPosition && column.position <= newPosition) {
                    column.position--;
                    await this.columnRepository.save(column);
                }
            }
        }
        else {
            for (const column of columns) {
                if (column.position >= newPosition && column.position < oldPosition) {
                    column.position++;
                    await this.columnRepository.save(column);
                }
            }
        }
    }
};
exports.ColumnsService = ColumnsService;
exports.ColumnsService = ColumnsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(column_entity_1.Column)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        boards_service_1.BoardsService])
], ColumnsService);
//# sourceMappingURL=columns.service.js.map