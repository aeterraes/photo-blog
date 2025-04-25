import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Merch } from '../../merch/entities/merch.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ name: 'merch_package_id' })
  merchPackageId: number;

  @ManyToOne(() => Merch, (merchPackage) => merchPackage.products, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'merch_package_id' })
  merchPackage: Merch;
}
