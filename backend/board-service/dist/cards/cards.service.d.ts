export declare class CardsService {
    constructor();
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<{
        id: string;
    }>;
    create(createCardDto: any): Promise<any>;
    update(id: string, updateCardDto: any): Promise<any>;
    remove(id: string): Promise<{
        id: string;
    }>;
}
