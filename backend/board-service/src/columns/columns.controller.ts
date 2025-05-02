import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('columns')
@Controller('columns')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new column' })
  @ApiResponse({ status: 201, description: 'Column successfully created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() createColumnDto: CreateColumnDto, @Request() req) {
    return this.columnsService.create(createColumnDto, req.user.sub);
  }

  @Get('board/:boardId')
  @ApiOperation({ summary: 'Get all columns for a board' })
  @ApiParam({ name: 'boardId', description: 'Board ID' })
  @ApiResponse({ status: 200, description: 'List of columns returned' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Board not found' })
  findAll(@Param('boardId') boardId: string, @Request() req) {
    return this.columnsService.findAll(boardId, req.user.sub);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific column by ID' })
  @ApiParam({ name: 'id', description: 'Column ID' })
  @ApiResponse({ status: 200, description: 'Column returned' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Column not found' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.columnsService.findOne(id, req.user.sub);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a column' })
  @ApiParam({ name: 'id', description: 'Column ID' })
  @ApiResponse({ status: 200, description: 'Column updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Column not found' })
  update(
    @Param('id') id: string,
    @Body() updateColumnDto: UpdateColumnDto,
    @Request() req,
  ) {
    return this.columnsService.update(id, updateColumnDto, req.user.sub);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a column' })
  @ApiParam({ name: 'id', description: 'Column ID' })
  @ApiResponse({ status: 200, description: 'Column deleted' })
  @ApiResponse({ status: 400, description: 'Bad Request - Column has cards' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Column not found' })
  remove(@Param('id') id: string, @Request() req) {
    return this.columnsService.remove(id, req.user.sub);
  }

  @Patch(':id/archive')
  @ApiOperation({ summary: 'Archive a column' })
  @ApiParam({ name: 'id', description: 'Column ID' })
  @ApiResponse({ status: 200, description: 'Column archived' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Column not found' })
  archiveColumn(@Param('id') id: string, @Request() req) {
    return this.columnsService.archiveColumn(id, req.user.sub);
  }

  @Patch(':id/unarchive')
  @ApiOperation({ summary: 'Unarchive a column' })
  @ApiParam({ name: 'id', description: 'Column ID' })
  @ApiResponse({ status: 200, description: 'Column unarchived' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Column not found' })
  unarchiveColumn(@Param('id') id: string, @Request() req) {
    return this.columnsService.unarchiveColumn(id, req.user.sub);
  }

  @Patch(':id/move/:position')
  @ApiOperation({ summary: 'Move a column to a new position' })
  @ApiParam({ name: 'id', description: 'Column ID' })
  @ApiParam({ name: 'position', description: 'New position' })
  @ApiResponse({ status: 200, description: 'Column moved' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Column not found' })
  moveColumn(
    @Param('id') id: string,
    @Param('position') position: number,
    @Request() req,
  ) {
    return this.columnsService.moveColumn(id, +position, req.user.sub);
  }
}