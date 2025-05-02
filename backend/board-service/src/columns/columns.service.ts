import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Column } from './entities/column.entity';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { BoardsService } from '../boards/boards.service';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(Column)
    private readonly columnRepository: Repository<Column>,
    private readonly boardsService: BoardsService,
  ) {}

  async create(createColumnDto: CreateColumnDto, userId: string): Promise<Column> {
    // Verify user has access to the board
    const board = await this.boardsService.findOne(createColumnDto.boardId, userId);
    
    // Get the highest position if not provided
    if (createColumnDto.position === undefined) {
      const lastColumn = await this.columnRepository.findOne({
        where: { boardId: createColumnDto.boardId },
        order: { position: 'DESC' },
      });
      
      createColumnDto.position = lastColumn ? lastColumn.position + 1 : 0;
    }
    
    // Create new column
    const column = this.columnRepository.create({
      ...createColumnDto,
      createdById: userId,
    });
    
    return this.columnRepository.save(column);
  }

  async findAll(boardId: string, userId: string): Promise<Column[]> {
    // Verify user has access to the board
    await this.boardsService.findOne(boardId, userId);
    
    // Get all columns for the board
    return this.columnRepository.find({
      where: { boardId, archived: false },
      order: { position: 'ASC' },
      relations: ['cards'],
    });
  }

  async findOne(id: string, userId: string): Promise<Column> {
    const column = await this.columnRepository.findOne({
      where: { id },
      relations: ['cards'],
    });
    
    if (!column) {
      throw new NotFoundException(`Column with ID ${id} not found`);
    }
    
    // Verify user has access to the board
    await this.boardsService.findOne(column.boardId, userId);
    
    return column;
  }

  async update(id: string, updateColumnDto: UpdateColumnDto, userId: string): Promise<Column> {
    const column = await this.findOne(id, userId);
    
    // Check if updating position
    if (updateColumnDto.position !== undefined && updateColumnDto.position !== column.position) {
      await this.updateColumnPositions(column.boardId, column.position, updateColumnDto.position);
    }
    
    // Update column
    await this.columnRepository.update(id, updateColumnDto);
    return this.findOne(id, userId);
  }

  async remove(id: string, userId: string): Promise<void> {
    const column = await this.findOne(id, userId);
    
    // Check if column has cards
    if (column.cards && column.cards.length > 0) {
      throw new BadRequestException('Cannot delete column that contains cards');
    }
    
    await this.columnRepository.remove(column);
  }

  async archiveColumn(id: string, userId: string): Promise<Column> {
    const column = await this.findOne(id, userId);
    
    column.archived = true;
    await this.columnRepository.save(column);
    
    return column;
  }

  async unarchiveColumn(id: string, userId: string): Promise<Column> {
    const column = await this.findOne(id, userId);
    
    column.archived = false;
    await this.columnRepository.save(column);
    
    return column;
  }

  async moveColumn(id: string, newPosition: number, userId: string): Promise<Column> {
    const column = await this.findOne(id, userId);
    
    if (newPosition === column.position) {
      return column; // No change needed
    }
    
    await this.updateColumnPositions(column.boardId, column.position, newPosition);
    
    // Update the column position
    column.position = newPosition;
    await this.columnRepository.save(column);
    
    return this.findOne(id, userId);
  }

  private async updateColumnPositions(boardId: string, oldPosition: number, newPosition: number): Promise<void> {
    // Get all columns in the board
    const columns = await this.columnRepository.find({
      where: { boardId, archived: false },
      order: { position: 'ASC' },
    });
    
    // Reorder columns
    if (oldPosition < newPosition) {
      // Moving forward: columns between old and new positions shift backward
      for (const column of columns) {
        if (column.position > oldPosition && column.position <= newPosition) {
          column.position--;
          await this.columnRepository.save(column);
        }
      }
    } else {
      // Moving backward: columns between new and old positions shift forward
      for (const column of columns) {
        if (column.position >= newPosition && column.position < oldPosition) {
          column.position++;
          await this.columnRepository.save(column);
        }
      }
    }
  }
}