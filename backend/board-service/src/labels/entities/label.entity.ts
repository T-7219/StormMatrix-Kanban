import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Board } from '../../boards/entities/board.entity';

@Entity('labels')
export class Label {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'uuid' })
  id: string;

  @Column()
  @ApiProperty({ example: 'Bug' })
  name: string;

  @Column()
  @ApiProperty({ example: '#FF0000' })
  color: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 'Critical issues that need immediate attention', nullable: true })
  description: string;

  @Column()
  @ApiProperty({ example: 'uuid' })
  boardId: string;

  @ManyToOne(() => Board, (board) => board.labels, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'boardId' })
  board: Board;

  @CreateDateColumn()
  @ApiProperty({ example: '2023-01-01T00:00:00Z' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ example: '2023-01-01T00:00:00Z' })
  updatedAt: Date;
}