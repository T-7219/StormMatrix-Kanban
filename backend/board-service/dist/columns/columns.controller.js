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
exports.ColumnsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const columns_service_1 = require("./columns.service");
const create_column_dto_1 = require("./dto/create-column.dto");
const update_column_dto_1 = require("./dto/update-column.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let ColumnsController = class ColumnsController {
    constructor(columnsService) {
        this.columnsService = columnsService;
    }
    create(createColumnDto, req) {
        return this.columnsService.create(createColumnDto, req.user.sub);
    }
    findAll(boardId, req) {
        return this.columnsService.findAll(boardId, req.user.sub);
    }
    findOne(id, req) {
        return this.columnsService.findOne(id, req.user.sub);
    }
    update(id, updateColumnDto, req) {
        return this.columnsService.update(id, updateColumnDto, req.user.sub);
    }
    remove(id, req) {
        return this.columnsService.remove(id, req.user.sub);
    }
    archiveColumn(id, req) {
        return this.columnsService.archiveColumn(id, req.user.sub);
    }
    unarchiveColumn(id, req) {
        return this.columnsService.unarchiveColumn(id, req.user.sub);
    }
    moveColumn(id, position, req) {
        return this.columnsService.moveColumn(id, +position, req.user.sub);
    }
};
exports.ColumnsController = ColumnsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new column' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Column successfully created' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_column_dto_1.CreateColumnDto, Object]),
    __metadata("design:returntype", void 0)
], ColumnsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('board/:boardId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all columns for a board' }),
    (0, swagger_1.ApiParam)({ name: 'boardId', description: 'Board ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of columns returned' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Board not found' }),
    __param(0, (0, common_1.Param)('boardId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ColumnsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific column by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Column ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Column returned' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Column not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ColumnsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a column' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Column ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Column updated' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Column not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_column_dto_1.UpdateColumnDto, Object]),
    __metadata("design:returntype", void 0)
], ColumnsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a column' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Column ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Column deleted' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request - Column has cards' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Column not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ColumnsController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/archive'),
    (0, swagger_1.ApiOperation)({ summary: 'Archive a column' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Column ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Column archived' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Column not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ColumnsController.prototype, "archiveColumn", null);
__decorate([
    (0, common_1.Patch)(':id/unarchive'),
    (0, swagger_1.ApiOperation)({ summary: 'Unarchive a column' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Column ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Column unarchived' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Column not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ColumnsController.prototype, "unarchiveColumn", null);
__decorate([
    (0, common_1.Patch)(':id/move/:position'),
    (0, swagger_1.ApiOperation)({ summary: 'Move a column to a new position' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Column ID' }),
    (0, swagger_1.ApiParam)({ name: 'position', description: 'New position' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Column moved' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Column not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('position')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Object]),
    __metadata("design:returntype", void 0)
], ColumnsController.prototype, "moveColumn", null);
exports.ColumnsController = ColumnsController = __decorate([
    (0, swagger_1.ApiTags)('columns'),
    (0, common_1.Controller)('columns'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [columns_service_1.ColumnsService])
], ColumnsController);
//# sourceMappingURL=columns.controller.js.map