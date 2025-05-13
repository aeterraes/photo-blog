import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Merch } from '../../merch/entities/merch.entity';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@InputType('UserInput')
@Entity('users')
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  username: string;

  @Field()
  @Column('text')
  password: string;

  @Field()
  @Column()
  email: string;

  @Field(() => [Merch], { nullable: true })
  @OneToMany(() => Merch, (merch) => merch.user)
  merchPackages: Merch[];
}
