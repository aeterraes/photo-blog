import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Merch } from '../../merch/entities/merch.entity';
import { Field, Float, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@InputType('ProductInput')
@Entity('products')
export class Product {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column('text')
  description: string;

  @Field(() => Float)
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Field(() => Int)
  @Column({ name: 'merch_package_id' })
  merchPackageId: number;

  @Field(() => Merch)
  @ManyToOne(() => Merch, (merchPackage) => merchPackage.products, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'merch_package_id' })
  merchPackage: Merch;
}
