import { Repository } from 'typeorm';
import { Column } from './entities/column.entity';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { BoardsService } from '../boards/boards.service';
export declare class ColumnsService {
    private readonly columnRepository;
    private readonly boardsService;
    constructor(columnRepository: Repository<Column>, boardsService: BoardsService);
    create(createColumnDto: CreateColumnDto, userId: string): Promise<Column>;
    findAll(boardId: string, userId: string): Promise<Column[]>;
    findOne(id: string, userId: string): Promise<Column>;
    update(id: string, updateColumnDto: UpdateColumnDto, userId: string): Promise<Column>;
    remove(id: string, userId: string): Promise<void>;
    archiveColumn(id: string, userId: string): Promise<Column>;
    unarchiveColumn(id: string, userId: string): Promise<Column>;
    moveColumn(id: string, newPosition: number, userId: string): Promise<Column>;
    private updateColumnPositions;
}
