import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CardsService } from './cards.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('cards')
@Controller('cards')
@UseGuards(JwtAuthGuard)
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new card' })
  create(@Body() createCardDto: any) {
    return this.cardsService.create(createCardDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cards' })
  findAll() {
    return this.cardsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a card by ID' })
  findOne(@Param('id') id: string) {
    return this.cardsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a card' })
  update(@Param('id') id: string, @Body() updateCardDto: any) {
    return this.cardsService.update(id, updateCardDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a card' })
  remove(@Param('id') id: string) {
    return this.cardsService.remove(id);
  }
}