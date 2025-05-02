import { Column as BoardColumn } from '../../columns/entities/column.entity';
import { Card } from '../../cards/entities/card.entity';
import { Label } from '../../labels/entities/label.entity';
export declare enum BoardVisibility {
    PRIVATE = "private",
    TEAM = "team",
    PUBLIC = "public"
}
export declare enum BoardBackground {
    COLOR = "color",
    IMAGE = "image"
}
export declare class Board {
    id: string;
    name: string;
    description: string;
    ownerId: string;
    memberIds: string[];
    visibility: BoardVisibility;
    backgroundType: BoardBackground;
    backgroundColor: string;
    backgroundImage: string;
    starred: boolean;
    archived: boolean;
    columns: BoardColumn[];
    cards: Card[];
    labels: Label[];
    createdAt: Date;
    updatedAt: Date;
    lastActivityAt: Date;
    addMember(userId: string): void;
    removeMember(userId: string): void;
    isMember(userId: string): boolean;
}
