import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Merch } from '../../merch/entities/merch.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column('text')
  password: string;

  @Column()
  email: string;

  @OneToMany(() => Merch, (merch) => merch.user)
  merchPackages: Merch[];
}
