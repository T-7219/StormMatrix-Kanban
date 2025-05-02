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
exports.BoardsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const boards_service_1 = require("./boards.service");
const create_board_dto_1 = require("./dto/create-board.dto");
const update_board_dto_1 = require("./dto/update-board.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let BoardsController = class BoardsController {
    constructor(boardsService) {
        this.boardsService = boardsService;
    }
    create(createBoardDto, req) {
        return this.boardsService.create(createBoardDto, req.user.sub);
    }
    findAll(req, includeArchived = false) {
        return this.boardsService.findAll(req.user.sub, { includeArchived });
    }
    findOne(id, req) {
        return this.boardsService.findOne(id, req.user.sub);
    }
    update(id, updateBoardDto, req) {
        return this.boardsService.update(id, updateBoardDto, req.user.sub);
    }
    remove(id, req) {
        return this.boardsService.remove(id, req.user.sub);
    }
    archiveBoard(id, req) {
        return this.boardsService.archiveBoard(id, req.user.sub);
    }
    unarchiveBoard(id, req) {
        return this.boardsService.unarchiveBoard(id, req.user.sub);
    }
    toggleStar(id, req) {
        return this.boardsService.toggleStar(id, req.user.sub);
    }
    addMember(id, userId, req) {
        return this.boardsService.addMember(id, userId, req.user.sub);
    }
    removeMember(id, userId, req) {
        return this.boardsService.removeMember(id, userId, req.user.sub);
    }
};
exports.BoardsController = BoardsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new board' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Board successfully created' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_board_dto_1.CreateBoardDto, Object]),
    __metadata("design:returntype", void 0)
], BoardsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all boards accessible to the user' }),
    (0, swagger_1.ApiQuery)({ name: 'includeArchived', required: false, type: Boolean }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of boards returned' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('includeArchived')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Boolean]),
    __metadata("design:returntype", void 0)
], BoardsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific board by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Board ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Board returned' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Board not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], BoardsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a board' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Board ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Board updated' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Board not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_board_dto_1.UpdateBoardDto, Object]),
    __metadata("design:returntype", void 0)
], BoardsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a board' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Board ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Board deleted' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Board not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], BoardsController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/archive'),
    (0, swagger_1.ApiOperation)({ summary: 'Archive a board' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Board ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Board archived' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Board not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], BoardsController.prototype, "archiveBoard", null);
__decorate([
    (0, common_1.Patch)(':id/unarchive'),
    (0, swagger_1.ApiOperation)({ summary: 'Unarchive a board' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Board ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Board unarchived' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Board not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], BoardsController.prototype, "unarchiveBoard", null);
__decorate([
    (0, common_1.Patch)(':id/star'),
    (0, swagger_1.ApiOperation)({ summary: 'Toggle star status of a board' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Board ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Board star status toggled' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Board not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], BoardsController.prototype, "toggleStar", null);
__decorate([
    (0, common_1.Post)(':id/members/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Add a member to a board' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Board ID' }),
    (0, swagger_1.ApiParam)({ name: 'userId', description: 'User ID to add as member' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Member added to board' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Board not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], BoardsController.prototype, "addMember", null);
__decorate([
    (0, common_1.Delete)(':id/members/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove a member from a board' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Board ID' }),
    (0, swagger_1.ApiParam)({ name: 'userId', description: 'User ID to remove' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Member removed from board' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Board not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], BoardsController.prototype, "removeMember", null);
exports.BoardsController = BoardsController = __decorate([
    (0, swagger_1.ApiTags)('boards'),
    (0, common_1.Controller)('boards'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [boards_service_1.BoardsService])
], BoardsController);
//# sourceMappingURL=boards.controller.js.map