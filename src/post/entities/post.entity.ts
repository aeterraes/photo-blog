import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@InputType('PostInput')
@Entity('posts')
export class Post {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column('text')
  description: string;

  @Field()
  @Column('text')
  imageUrl: string;

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  dateCreated: Date;
}
