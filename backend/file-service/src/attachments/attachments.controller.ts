import { Controller, Get, Post, Param, Delete, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { AttachmentsService } from './attachments.service';

@ApiTags('attachments')
@Controller('attachments')
export class AttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) {}

  @Post('upload')
  @ApiOperation({ summary: 'Upload a file attachment (placeholder)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File) {
    return {
      message: 'File upload endpoint - coming soon!',
      status: 'under development',
      filename: file?.filename || 'example-file.png',
      originalName: file?.originalname || 'example.png',
      timestamp: new Date().toISOString()
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get file attachment by ID (placeholder)' })
  findOne(@Param('id') id: string, @Res() res: Response) {
    return res.status(200).json({
      message: 'File download endpoint - coming soon!',
      status: 'under development',
      fileId: id,
      timestamp: new Date().toISOString()
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete file attachment (placeholder)' })
  remove(@Param('id') id: string) {
    return {
      message: 'File deletion endpoint - coming soon!',
      status: 'under development',
      fileId: id,
      timestamp: new Date().toISOString()
    };
  }
}