export declare class LabelsService {
    constructor();
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<{
        id: string;
    }>;
    create(createLabelDto: any): Promise<any>;
    update(id: string, updateLabelDto: any): Promise<any>;
    remove(id: string): Promise<{
        id: string;
    }>;
}
