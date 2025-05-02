import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { LabelsService } from './labels.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('labels')
@Controller('labels')
@UseGuards(JwtAuthGuard)
export class LabelsController {
  constructor(private readonly labelsService: LabelsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new label' })
  create(@Body() createLabelDto: any) {
    return this.labelsService.create(createLabelDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all labels' })
  findAll() {
    return this.labelsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a label by ID' })
  findOne(@Param('id') id: string) {
    return this.labelsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a label' })
  update(@Param('id') id: string, @Body() updateLabelDto: any) {
    return this.labelsService.update(id, updateLabelDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a label' })
  remove(@Param('id') id: string) {
    return this.labelsService.remove(id);
  }
}