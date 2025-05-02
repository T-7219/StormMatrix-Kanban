import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Board } from './entities/board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
export declare class BoardsService {
    private readonly boardRepository;
    private readonly configService;
    constructor(boardRepository: Repository<Board>, configService: ConfigService);
    create(createBoardDto: CreateBoardDto, userId: string): Promise<Board>;
    findAll(userId: string, options?: {
        includeArchived?: boolean;
    }): Promise<Board[]>;
    findOne(id: string, userId: string): Promise<Board>;
    update(id: string, updateBoardDto: UpdateBoardDto, userId: string): Promise<Board>;
    remove(id: string, userId: string): Promise<void>;
    addMember(boardId: string, memberUserId: string, requestUserId: string): Promise<Board>;
    removeMember(boardId: string, memberUserId: string, requestUserId: string): Promise<Board>;
    archiveBoard(id: string, userId: string): Promise<Board>;
    unarchiveBoard(id: string, userId: string): Promise<Board>;
    toggleStar(id: string, userId: string): Promise<Board>;
}
