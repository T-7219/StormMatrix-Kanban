import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Patch, 
  Delete, 
  Body, 
  Param, 
  Query, 
  UseGuards, 
  Request 
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiBearerAuth, 
  ApiParam, 
  ApiQuery 
} from '@nestjs/swagger';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('boards')
@Controller('boards')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new board' })
  @ApiResponse({ status: 201, description: 'Board successfully created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() createBoardDto: CreateBoardDto, @Request() req) {
    return this.boardsService.create(createBoardDto, req.user.sub);
  }

  @Get()
  @ApiOperation({ summary: 'Get all boards accessible to the user' })
  @ApiQuery({ name: 'includeArchived', required: false, type: Boolean })
  @ApiResponse({ status: 200, description: 'List of boards returned' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll(
    @Request() req, 
    @Query('includeArchived') includeArchived: boolean = false
  ) {
    return this.boardsService.findAll(req.user.sub, { includeArchived });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific board by ID' })
  @ApiParam({ name: 'id', description: 'Board ID' })
  @ApiResponse({ status: 200, description: 'Board returned' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Board not found' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.boardsService.findOne(id, req.user.sub);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a board' })
  @ApiParam({ name: 'id', description: 'Board ID' })
  @ApiResponse({ status: 200, description: 'Board updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Board not found' })
  update(
    @Param('id') id: string, 
    @Body() updateBoardDto: UpdateBoardDto, 
    @Request() req
  ) {
    return this.boardsService.update(id, updateBoardDto, req.user.sub);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a board' })
  @ApiParam({ name: 'id', description: 'Board ID' })
  @ApiResponse({ status: 200, description: 'Board deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Board not found' })
  remove(@Param('id') id: string, @Request() req) {
    return this.boardsService.remove(id, req.user.sub);
  }

  @Patch(':id/archive')
  @ApiOperation({ summary: 'Archive a board' })
  @ApiParam({ name: 'id', description: 'Board ID' })
  @ApiResponse({ status: 200, description: 'Board archived' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Board not found' })
  archiveBoard(@Param('id') id: string, @Request() req) {
    return this.boardsService.archiveBoard(id, req.user.sub);
  }

  @Patch(':id/unarchive')
  @ApiOperation({ summary: 'Unarchive a board' })
  @ApiParam({ name: 'id', description: 'Board ID' })
  @ApiResponse({ status: 200, description: 'Board unarchived' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Board not found' })
  unarchiveBoard(@Param('id') id: string, @Request() req) {
    return this.boardsService.unarchiveBoard(id, req.user.sub);
  }

  @Patch(':id/star')
  @ApiOperation({ summary: 'Toggle star status of a board' })
  @ApiParam({ name: 'id', description: 'Board ID' })
  @ApiResponse({ status: 200, description: 'Board star status toggled' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Board not found' })
  toggleStar(@Param('id') id: string, @Request() req) {
    return this.boardsService.toggleStar(id, req.user.sub);
  }

  @Post(':id/members/:userId')
  @ApiOperation({ summary: 'Add a member to a board' })
  @ApiParam({ name: 'id', description: 'Board ID' })
  @ApiParam({ name: 'userId', description: 'User ID to add as member' })
  @ApiResponse({ status: 200, description: 'Member added to board' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Board not found' })
  addMember(
    @Param('id') id: string,
    @Param('userId') userId: string,
    @Request() req
  ) {
    return this.boardsService.addMember(id, userId, req.user.sub);
  }

  @Delete(':id/members/:userId')
  @ApiOperation({ summary: 'Remove a member from a board' })
  @ApiParam({ name: 'id', description: 'Board ID' })
  @ApiParam({ name: 'userId', description: 'User ID to remove' })
  @ApiResponse({ status: 200, description: 'Member removed from board' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Board not found' })
  removeMember(
    @Param('id') id: string,
    @Param('userId') userId: string,
    @Request() req
  ) {
    return this.boardsService.removeMember(id, userId, req.user.sub);
  }
}