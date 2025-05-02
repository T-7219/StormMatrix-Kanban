import { Board } from '../../boards/entities/board.entity';
import { Column as BoardColumn } from '../../columns/entities/column.entity';
import { Label } from '../../labels/entities/label.entity';
export declare enum CardPriority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
    URGENT = "urgent"
}
export declare class Card {
    id: string;
    title: string;
    description: string;
    dueDate: Date;
    position: number;
    archived: boolean;
    coverImage: string;
    priority: CardPriority;
    assigneeIds: string[];
    watcherIds: string[];
    createdById: string;
    estimatedTime: number;
    spentTime: number;
    boardId: string;
    board: Board;
    columnId: string;
    column: BoardColumn;
    labels: Label[];
    attachmentIds: string[];
    completed: boolean;
    completedAt: Date;
    completedById: string;
    createdAt: Date;
    updatedAt: Date;
    lastActivityAt: Date;
    addAssignee(userId: string): void;
    removeAssignee(userId: string): void;
    addWatcher(userId: string): void;
    removeWatcher(userId: string): void;
    addMember(userId: string): void;
    removeMember(userId: string): void;
    isMember(userId: string): boolean;
}
