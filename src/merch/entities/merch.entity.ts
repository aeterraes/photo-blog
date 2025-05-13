import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Image } from '../../gallery/entities/image.entity';
import { Product } from '../../product/entities/product.entity';
import { User } from '../../user/entities/user.entity';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@InputType('MerchInput')
@Entity('merch_packages')
export class Merch {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column({ name: 'user_id' })
  userId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.merchPackages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Field()
  @Column()
  merchType: string;

  @Field()
  @Column()
  designType: string;

  @Field()
  @Column()
  collection: string;

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  dateCreated: Date;

  @Field(() => [Product], { nullable: true })
  @OneToMany(() => Product, (product) => product.merchPackage)
  products: Product[];

  @Field(() => [Image], { nullable: true })
  @OneToMany(() => Image, (image) => image.merchPackage)
  images: Image[];
}
