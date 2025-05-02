import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  ManyToOne, 
  ManyToMany,
  JoinTable,
  CreateDateColumn, 
  UpdateDateColumn,
  JoinColumn,
  Index
} from 'typeorm';
import { Board } from '../../boards/entities/board.entity';
import { Column as BoardColumn } from '../../columns/entities/column.entity';
import { Label } from '../../labels/entities/label.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum CardPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

@Entity('cards')
export class Card {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'uuid' })
  id: string;

  @Column()
  @ApiProperty({ example: 'Implement login feature' })
  title: string;

  @Column({ nullable: true, type: 'text' })
  @ApiProperty({ 
    example: 'Create login form and API endpoint', 
    nullable: true 
  })
  description: string;

  @Column({ nullable: true })
  @ApiProperty({ example: '2023-12-31T23:59:59Z', nullable: true })
  dueDate: Date;

  @Column({ default: 0 })
  @ApiProperty({ example: 0 })
  position: number;

  @Column({ default: false })
  @ApiProperty({ example: false })
  archived: boolean;

  @Column({ nullable: true })
  @ApiProperty({ example: 'uuid', nullable: true })
  coverImage: string;

  @Column({ enum: CardPriority, default: CardPriority.MEDIUM })
  priority: CardPriority;

  @Column('simple-array', { default: '' })
  assigneeIds: string[];
  
  @Column('simple-array', { default: '' })
  watcherIds: string[];
  
  @Column({ nullable: true })
  @ApiProperty({ example: 'uuid', nullable: true })
  createdById: string;

  @Column({ default: 0 })
  estimatedTime: number; // in minutes
  
  @Column({ default: 0 })
  spentTime: number; // in minutes

  @Column()
  @Index()
  @ApiProperty({ example: 'uuid' })
  boardId: string;

  @ManyToOne(() => Board, board => board.cards, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'boardId' })
  board: Board;

  @Column()
  @Index()
  @ApiProperty({ example: 'uuid' })
  columnId: string;

  @ManyToOne(() => BoardColumn, column => column.cards, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'columnId' })
  column: BoardColumn;

  @ManyToMany(() => Label)
  @JoinTable({
    name: 'card_labels',
    joinColumn: { name: 'card_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'label_id', referencedColumnName: 'id' },
  })
  labels: Label[];

  @Column('simple-array', { default: '' })
  attachmentIds: string[]; // References to file service

  @Column({ default: false })
  @ApiProperty({ example: false })
  completed: boolean;

  @Column({ nullable: true })
  @ApiProperty({ example: '2023-01-01T00:00:00Z', nullable: true })
  completedAt: Date;

  @Column({ nullable: true })
  @ApiProperty({ example: 'uuid', nullable: true })
  completedById: string;

  @CreateDateColumn()
  @ApiProperty({ example: '2023-01-01T00:00:00Z' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ example: '2023-01-01T00:00:00Z' })
  updatedAt: Date;

  @Column({ nullable: true })
  @ApiProperty({ example: '2023-01-01T00:00:00Z', nullable: true })
  lastActivityAt: Date;

  // Helper methods
  addAssignee(userId: string) {
    if (!this.assigneeIds) {
      this.assigneeIds = [];
    }
    if (!this.assigneeIds.includes(userId)) {
      this.assigneeIds.push(userId);
    }
  }

  removeAssignee(userId: string) {
    if (this.assigneeIds && this.assigneeIds.includes(userId)) {
      this.assigneeIds = this.assigneeIds.filter(id => id !== userId);
    }
  }

  addWatcher(userId: string) {
    if (!this.watcherIds) {
      this.watcherIds = [];
    }
    if (!this.watcherIds.includes(userId)) {
      this.watcherIds.push(userId);
    }
  }

  removeWatcher(userId: string) {
    if (this.watcherIds && this.watcherIds.includes(userId)) {
      this.watcherIds = this.watcherIds.filter(id => id !== userId);
    }
  }

  addMember(userId: string) {
    if (!this.assigneeIds) {
      this.assigneeIds = [];
    }
    if (!this.assigneeIds.includes(userId)) {
      this.assigneeIds.push(userId);
    }
  }

  removeMember(userId: string) {
    if (this.assigneeIds && this.assigneeIds.includes(userId)) {
      this.assigneeIds = this.assigneeIds.filter(id => id !== userId);
    }
  }

  isMember(userId: string): boolean {
    return this.assigneeIds?.includes(userId) || false;
  }
}