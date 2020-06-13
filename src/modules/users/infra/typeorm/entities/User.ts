import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import Payment from '@modules/payments/infra/typeorm/entities/Payment';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  email: string;

  // @OneToMany(() => Payment, payment => payment.user_id)
  // // @JoinColumn({ name: 'id' })
  // payments: Payment[];

  @Column('varchar')
  @Exclude()
  password: string;

  @CreateDateColumn()
  created_at: Date;
}
export default User;
