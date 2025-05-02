import { Board } from '../../boards/entities/board.entity';
export declare class Label {
    id: string;
    name: string;
    color: string;
    description: string;
    boardId: string;
    board: Board;
    createdAt: Date;
    updatedAt: Date;
}
