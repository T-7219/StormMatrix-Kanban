import { BoardVisibility, BoardBackground } from '../entities/board.entity';
export declare class CreateBoardDto {
    name: string;
    description?: string;
    visibility: BoardVisibility;
    backgroundType?: BoardBackground;
    backgroundColor?: string;
    backgroundImage?: string;
    initialColumns?: string[];
}
