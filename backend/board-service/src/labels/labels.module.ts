import { Module } from '@nestjs/common';
import { LabelsService } from './labels.service';
import { LabelsController } from './labels.controller';

@Module({
  controllers: [LabelsController],
  providers: [LabelsService],
  exports: [LabelsService]
})
export class LabelsModule {}