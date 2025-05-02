import { CardsService } from './cards.service';
export declare class CardsController {
    private readonly cardsService;
    constructor(cardsService: CardsService);
    create(createCardDto: any): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<{
        id: string;
    }>;
    update(id: string, updateCardDto: any): Promise<any>;
    remove(id: string): Promise<{
        id: string;
    }>;
}
