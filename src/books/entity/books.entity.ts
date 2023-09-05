import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  year: number;

  @Column()
  category: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
