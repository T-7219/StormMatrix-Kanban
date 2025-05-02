import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
export declare class BoardsController {
    private readonly boardsService;
    constructor(boardsService: BoardsService);
    create(createBoardDto: CreateBoardDto, req: any): Promise<import("./entities/board.entity").Board>;
    findAll(req: any, includeArchived?: boolean): Promise<import("./entities/board.entity").Board[]>;
    findOne(id: string, req: any): Promise<import("./entities/board.entity").Board>;
    update(id: string, updateBoardDto: UpdateBoardDto, req: any): Promise<import("./entities/board.entity").Board>;
    remove(id: string, req: any): Promise<void>;
    archiveBoard(id: string, req: any): Promise<import("./entities/board.entity").Board>;
    unarchiveBoard(id: string, req: any): Promise<import("./entities/board.entity").Board>;
    toggleStar(id: string, req: any): Promise<import("./entities/board.entity").Board>;
    addMember(id: string, userId: string, req: any): Promise<import("./entities/board.entity").Board>;
    removeMember(id: string, userId: string, req: any): Promise<import("./entities/board.entity").Board>;
}
