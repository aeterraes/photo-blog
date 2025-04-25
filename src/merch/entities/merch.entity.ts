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
@Entity('merch_packages')
export class Merch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, (user) => user.merchPackages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
  @Column()
  merchType: string;

  @Column()
  designType: string;

  @Column()
  collection: string;

  @CreateDateColumn({ type: 'timestamp' })
  dateCreated: Date;

  @OneToMany(() => Product, (product) => product.merchPackage)
  products: Product[];

  @OneToMany(() => Image, (image) => image.merchPackage)
  images: Image[];
}
