import { Response } from 'express';
import { AttachmentsService } from './attachments.service';
export declare class AttachmentsController {
    private readonly attachmentsService;
    constructor(attachmentsService: AttachmentsService);
    upload(file: Express.Multer.File): {
        message: string;
        status: string;
        filename: any;
        originalName: any;
        timestamp: string;
    };
    findOne(id: string, res: Response): any;
    remove(id: string): {
        message: string;
        status: string;
        fileId: string;
        timestamp: string;
    };
}
