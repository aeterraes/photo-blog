import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Merch } from '../../merch/entities/merch.entity';

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  url: string;

  @Column({ name: 'merch_package_id', nullable: true })
  merchPackageId: number | null;

  @ManyToOne(() => Merch, (merch) => merch.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'merch_package_id' })
  merchPackage: Merch;
}
