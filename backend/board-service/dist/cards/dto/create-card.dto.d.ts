export declare class CreateCardDto {
    title: string;
    description?: string;
    dueDate?: Date;
    position?: number;
    archived?: boolean;
    coverImage?: string;
    priority?: number;
    columnId: string;
}
