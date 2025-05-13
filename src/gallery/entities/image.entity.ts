import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Merch } from '../../merch/entities/merch.entity';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@InputType('ImageInput')
@Entity('images')
export class Image {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('text')
  url: string;

  @Field(() => Int, { nullable: true })
  @Column({ name: 'merch_package_id', nullable: true })
  merchPackageId: number | null;

  @Field(() => Merch, { nullable: true })
  @ManyToOne(() => Merch, (merch) => merch.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'merch_package_id' })
  merchPackage: Merch;
}
