import { ConfigService } from '@nestjs/config';
export declare class AttachmentsService {
    private readonly configService;
    private readonly uploadDir;
    constructor(configService: ConfigService);
    saveFile(file: Express.Multer.File): Promise<{
        id: string;
        filename: any;
        originalName: any;
        mimetype: any;
        size: any;
        path: any;
        createdAt: string;
    }>;
    getFile(id: string): Promise<{
        id: string;
        filename: string;
        originalName: string;
        mimetype: string;
        size: number;
        path: string;
        createdAt: string;
    }>;
    deleteFile(id: string): Promise<{
        deleted: boolean;
        id: string;
    }>;
}
