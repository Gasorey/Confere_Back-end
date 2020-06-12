import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';

@Entity('payments')
class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  status: string;

  @Column('varchar')
  description: string;

  @Column('uuid')
  transaction_id: string;

  @Column('uuid')
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => Transaction)
  @JoinColumn({ name: 'transaction_id' })
  transaction: Transaction;
}
export default Payment;
