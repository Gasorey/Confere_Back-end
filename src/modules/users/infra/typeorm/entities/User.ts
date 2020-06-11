import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  email: string;

  @Column('uuid')
  transaction_id: string;

  @OneToMany(() => Transaction, transaction => transaction.id)
  transactions: Transaction[];

  @Column('varchar')
  @Exclude()
  password: string;

  @CreateDateColumn()
  created_at: Date;
}
export default User;
