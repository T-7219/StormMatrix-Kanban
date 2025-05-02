import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
export declare class ColumnsController {
    private readonly columnsService;
    constructor(columnsService: ColumnsService);
    create(createColumnDto: CreateColumnDto, req: any): Promise<import("./entities/column.entity").Column>;
    findAll(boardId: string, req: any): Promise<import("./entities/column.entity").Column[]>;
    findOne(id: string, req: any): Promise<import("./entities/column.entity").Column>;
    update(id: string, updateColumnDto: UpdateColumnDto, req: any): Promise<import("./entities/column.entity").Column>;
    remove(id: string, req: any): Promise<void>;
    archiveColumn(id: string, req: any): Promise<import("./entities/column.entity").Column>;
    unarchiveColumn(id: string, req: any): Promise<import("./entities/column.entity").Column>;
    moveColumn(id: string, position: number, req: any): Promise<import("./entities/column.entity").Column>;
}
