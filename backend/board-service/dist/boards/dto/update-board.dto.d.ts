import { BoardVisibility, BoardBackground } from '../entities/board.entity';
export declare class UpdateBoardDto {
    name?: string;
    description?: string;
    visibility?: BoardVisibility;
    backgroundType?: BoardBackground;
    backgroundColor?: string;
    backgroundImage?: string;
    starred?: boolean;
    archived?: boolean;
    memberIds?: string[];
}
