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
exports.BoardsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const config_1 = require("@nestjs/config");
const board_entity_1 = require("./entities/board.entity");
let BoardsService = class BoardsService {
    constructor(boardRepository, configService) {
        this.boardRepository = boardRepository;
        this.configService = configService;
    }
    async create(createBoardDto, userId) {
        const maxBoardsPerUser = this.configService.get('board.maxBoardsPerUser');
        const userBoardCount = await this.boardRepository.count({ where: { ownerId: userId } });
        if (userBoardCount >= maxBoardsPerUser) {
            throw new common_1.BadRequestException(`User has reached the maximum limit of ${maxBoardsPerUser} boards`);
        }
        const board = this.boardRepository.create({
            ...createBoardDto,
            ownerId: userId,
            memberIds: [userId],
            lastActivityAt: new Date(),
        });
        return this.boardRepository.save(board);
    }
    async findAll(userId, options = {}) {
        const { includeArchived = false } = options;
        const whereConditions = [
            { ownerId: userId, archived: !includeArchived ? false : undefined },
            { memberIds: (0, typeorm_2.In)([userId]), archived: !includeArchived ? false : undefined },
            { visibility: board_entity_1.BoardVisibility.PUBLIC, archived: !includeArchived ? false : undefined },
        ];
        return this.boardRepository.find({
            where: whereConditions,
            order: {
                starred: 'DESC',
                updatedAt: 'DESC',
            },
            relations: ['columns'],
        });
    }
    async findOne(id, userId) {
        const board = await this.boardRepository.findOne({
            where: { id },
            relations: ['columns', 'labels'],
        });
        if (!board) {
            throw new common_1.NotFoundException(`Board with ID ${id} not found`);
        }
        if (board.visibility !== board_entity_1.BoardVisibility.PUBLIC &&
            board.ownerId !== userId &&
            !board.memberIds.includes(userId)) {
            throw new common_1.ForbiddenException('You do not have permission to access this board');
        }
        return board;
    }
    async update(id, updateBoardDto, userId) {
        const board = await this.findOne(id, userId);
        if (board.ownerId !== userId) {
            const restrictedFields = ['visibility'];
            const hasRestrictedFields = restrictedFields.some(field => field in updateBoardDto);
            if (hasRestrictedFields) {
                throw new common_1.ForbiddenException('Only the board owner can update these properties');
            }
        }
        const updatedFields = {
            ...updateBoardDto,
            lastActivityAt: new Date()
        };
        await this.boardRepository.update(id, updatedFields);
        return this.findOne(id, userId);
    }
    async remove(id, userId) {
        const board = await this.findOne(id, userId);
        if (board.ownerId !== userId) {
            throw new common_1.ForbiddenException('Only the board owner can delete this board');
        }
        await this.boardRepository.remove(board);
    }
    async addMember(boardId, memberUserId, requestUserId) {
        const board = await this.findOne(boardId, requestUserId);
        if (board.visibility === board_entity_1.BoardVisibility.PRIVATE && board.ownerId !== requestUserId) {
            throw new common_1.ForbiddenException('Only the board owner can add members to a private board');
        }
        board.addMember(memberUserId);
        await this.boardRepository.save(board);
        return this.findOne(boardId, requestUserId);
    }
    async removeMember(boardId, memberUserId, requestUserId) {
        const board = await this.findOne(boardId, requestUserId);
        if (board.ownerId !== requestUserId && requestUserId !== memberUserId) {
            throw new common_1.ForbiddenException('You do not have permission to remove this member');
        }
        if (memberUserId === board.ownerId) {
            throw new common_1.BadRequestException('Cannot remove the board owner from members');
        }
        board.removeMember(memberUserId);
        await this.boardRepository.save(board);
        return this.findOne(boardId, requestUserId);
    }
    async archiveBoard(id, userId) {
        const board = await this.findOne(id, userId);
        if (board.ownerId !== userId) {
            throw new common_1.ForbiddenException('Only the board owner can archive this board');
        }
        board.archived = true;
        await this.boardRepository.save(board);
        return board;
    }
    async unarchiveBoard(id, userId) {
        const board = await this.findOne(id, userId);
        if (board.ownerId !== userId) {
            throw new common_1.ForbiddenException('Only the board owner can unarchive this board');
        }
        board.archived = false;
        await this.boardRepository.save(board);
        return board;
    }
    async toggleStar(id, userId) {
        const board = await this.findOne(id, userId);
        board.starred = !board.starred;
        await this.boardRepository.save(board);
        return board;
    }
};
exports.BoardsService = BoardsService;
exports.BoardsService = BoardsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(board_entity_1.Board)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService])
], BoardsService);
//# sourceMappingURL=boards.service.js.map