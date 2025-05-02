import {
  Entity,
  Column as TypeOrmColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Board } from '../../boards/entities/board.entity';
import { Card } from '../../cards/entities/card.entity';

@Entity('columns')
export class Column {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'uuid' })
  id: string;

  @TypeOrmColumn()
  @ApiProperty({ example: 'In Progress' })
  name: string;

  @TypeOrmColumn({ default: 0 })
  @ApiProperty({ example: 0 })
  position: number;

  @TypeOrmColumn({ default: false })
  @ApiProperty({ example: false })
  isCompleted: boolean;

  @TypeOrmColumn({ nullable: true })
  @ApiProperty({ example: 10, nullable: true })
  cardLimit: number;

  @TypeOrmColumn({ default: false })
  @ApiProperty({ example: false })
  archived: boolean;

  @TypeOrmColumn()
  @ApiProperty({ example: 'uuid' })
  boardId: string;

  @ManyToOne(() => Board, (board) => board.columns, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'boardId' })
  board: Board;

  @OneToMany(() => Card, (card) => card.column)
  cards: Card[];

  @TypeOrmColumn({ nullable: true })
  @ApiProperty({ example: 'uuid', nullable: true })
  createdById: string;

  @CreateDateColumn()
  @ApiProperty({ example: '2023-01-01T00:00:00Z' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ example: '2023-01-01T00:00:00Z' })
  updatedAt: Date;
}