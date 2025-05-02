import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { Column as BoardColumn } from '../../columns/entities/column.entity';
import { Card } from '../../cards/entities/card.entity';
import { Label } from '../../labels/entities/label.entity';

export enum BoardVisibility {
  PRIVATE = 'private',
  TEAM = 'team',
  PUBLIC = 'public',
}

export enum BoardBackground {
  COLOR = 'color',
  IMAGE = 'image',
}

@Entity('boards')
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column()
  ownerId: string;

  @Column('simple-array')
  memberIds: string[];

  @Column({
    type: 'enum',
    enum: BoardVisibility,
    default: BoardVisibility.PRIVATE
  })
  visibility: BoardVisibility;

  @Column({
    type: 'enum',
    enum: BoardBackground,
    default: BoardBackground.COLOR
  })
  backgroundType: BoardBackground;

  @Column({ default: '#0079bf' }) // Default blue color
  backgroundColor: string;

  @Column({ nullable: true })
  backgroundImage: string;

  @Column({ default: false })
  starred: boolean;

  @Column({ default: false })
  archived: boolean;

  @OneToMany(() => BoardColumn, column => column.board, { cascade: true })
  columns: BoardColumn[];

  @OneToMany(() => Card, card => card.board, { cascade: true })
  cards: Card[];

  @OneToMany(() => Label, label => label.boardId, { cascade: true })
  labels: Label[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  lastActivityAt: Date;

  // Helper method to add a member to the board
  addMember(userId: string) {
    if (!this.memberIds) {
      this.memberIds = [];
    }
    if (!this.memberIds.includes(userId)) {
      this.memberIds.push(userId);
    }
  }

  // Helper method to remove a member from the board
  removeMember(userId: string) {
    if (this.memberIds && this.memberIds.includes(userId)) {
      this.memberIds = this.memberIds.filter(id => id !== userId);
    }
  }

  // Helper method to check if a user is a member of the board
  isMember(userId: string): boolean {
    return this.memberIds?.includes(userId) || false;
  }
}