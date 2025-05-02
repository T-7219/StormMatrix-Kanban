import { LabelsService } from './labels.service';
export declare class LabelsController {
    private readonly labelsService;
    constructor(labelsService: LabelsService);
    create(createLabelDto: any): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<{
        id: string;
    }>;
    update(id: string, updateLabelDto: any): Promise<any>;
    remove(id: string): Promise<{
        id: string;
    }>;
}
