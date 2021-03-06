import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';

@Entity('received')
class Received {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  status: string;

  @Column('uuid')
  transaction_id: string;

  @Column({ type: 'numeric', precision: 15, scale: 2 })
  value: number;

  @ManyToOne(() => Transaction, transaction => transaction.id)
  @JoinColumn({ name: 'transaction_id' })
  transaction: Transaction;

  @Column('timestamp')
  received_date: Date;
}
export default Received;
