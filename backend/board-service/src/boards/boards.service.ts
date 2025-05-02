import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, In } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Board, BoardVisibility } from './entities/board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    private readonly configService: ConfigService,
  ) {}

  async create(createBoardDto: CreateBoardDto, userId: string): Promise<Board> {
    // Check if user has reached maximum board limit
    const maxBoardsPerUser = this.configService.get<number>('board.maxBoardsPerUser');
    const userBoardCount = await this.boardRepository.count({ where: { ownerId: userId } });
    
    if (userBoardCount >= maxBoardsPerUser) {
      throw new BadRequestException(`User has reached the maximum limit of ${maxBoardsPerUser} boards`);
    }

    // Create new board
    const board = this.boardRepository.create({
      ...createBoardDto,
      ownerId: userId,
      memberIds: [userId], // Owner is also a member
      lastActivityAt: new Date(),
    });

    return this.boardRepository.save(board);
  }

  async findAll(userId: string, options: { includeArchived?: boolean } = {}): Promise<Board[]> {
    const { includeArchived = false } = options;
    
    // Fix: Use proper TypeORM query syntax for complex OR queries
    const whereConditions: FindOptionsWhere<Board>[] = [
      // Boards owned by the user
      { ownerId: userId, archived: !includeArchived ? false : undefined },
      // Boards where user is a member
      { memberIds: In([userId]), archived: !includeArchived ? false : undefined },
      // Public boards if needed
      { visibility: BoardVisibility.PUBLIC, archived: !includeArchived ? false : undefined },
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

  async findOne(id: string, userId: string): Promise<Board> {
    const board = await this.boardRepository.findOne({
      where: { id },
      relations: ['columns', 'labels'],
    });

    if (!board) {
      throw new NotFoundException(`Board with ID ${id} not found`);
    }

    // Check if user has permission to view this board
    if (
      board.visibility !== BoardVisibility.PUBLIC && 
      board.ownerId !== userId && 
      !board.memberIds.includes(userId)
    ) {
      throw new ForbiddenException('You do not have permission to access this board');
    }

    return board;
  }

  async update(id: string, updateBoardDto: UpdateBoardDto, userId: string): Promise<Board> {
    const board = await this.findOne(id, userId);
    
    // Only the owner can update certain properties
    if (board.ownerId !== userId) {
      const restrictedFields = ['visibility'];
      const hasRestrictedFields = restrictedFields.some(field => field in updateBoardDto);
      
      if (hasRestrictedFields) {
        throw new ForbiddenException('Only the board owner can update these properties');
      }
    }

    // Update the last activity timestamp
    const updatedFields = {
      ...updateBoardDto,
      lastActivityAt: new Date()
    };

    await this.boardRepository.update(id, updatedFields);
    return this.findOne(id, userId);
  }

  async remove(id: string, userId: string): Promise<void> {
    const board = await this.findOne(id, userId);
    
    // Only owner can delete a board
    if (board.ownerId !== userId) {
      throw new ForbiddenException('Only the board owner can delete this board');
    }
    
    await this.boardRepository.remove(board);
  }

  async addMember(boardId: string, memberUserId: string, requestUserId: string): Promise<Board> {
    const board = await this.findOne(boardId, requestUserId);
    
    // Only the owner can add members to a private board
    if (board.visibility === BoardVisibility.PRIVATE && board.ownerId !== requestUserId) {
      throw new ForbiddenException('Only the board owner can add members to a private board');
    }

    // Add the member
    board.addMember(memberUserId);
    await this.boardRepository.save(board);
    
    return this.findOne(boardId, requestUserId);
  }

  async removeMember(boardId: string, memberUserId: string, requestUserId: string): Promise<Board> {
    const board = await this.findOne(boardId, requestUserId);
    
    // Check permissions
    if (board.ownerId !== requestUserId && requestUserId !== memberUserId) {
      throw new ForbiddenException('You do not have permission to remove this member');
    }
    
    // Cannot remove the owner from the members list
    if (memberUserId === board.ownerId) {
      throw new BadRequestException('Cannot remove the board owner from members');
    }

    // Remove the member
    board.removeMember(memberUserId);
    await this.boardRepository.save(board);
    
    return this.findOne(boardId, requestUserId);
  }

  async archiveBoard(id: string, userId: string): Promise<Board> {
    const board = await this.findOne(id, userId);
    
    // Only the owner can archive a board
    if (board.ownerId !== userId) {
      throw new ForbiddenException('Only the board owner can archive this board');
    }
    
    board.archived = true;
    await this.boardRepository.save(board);
    
    return board;
  }

  async unarchiveBoard(id: string, userId: string): Promise<Board> {
    const board = await this.findOne(id, userId);
    
    // Only the owner can unarchive a board
    if (board.ownerId !== userId) {
      throw new ForbiddenException('Only the board owner can unarchive this board');
    }
    
    board.archived = false;
    await this.boardRepository.save(board);
    
    return board;
  }

  async toggleStar(id: string, userId: string): Promise<Board> {
    const board = await this.findOne(id, userId);
    
    // Toggle the star status
    board.starred = !board.starred;
    await this.boardRepository.save(board);
    
    return board;
  }
}