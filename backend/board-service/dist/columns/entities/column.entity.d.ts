import { Board } from '../../boards/entities/board.entity';
import { Card } from '../../cards/entities/card.entity';
export declare class Column {
    id: string;
    name: string;
    position: number;
    isCompleted: boolean;
    cardLimit: number;
    archived: boolean;
    boardId: string;
    board: Board;
    cards: Card[];
    createdById: string;
    createdAt: Date;
    updatedAt: Date;
}
