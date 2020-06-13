import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import Card from '@modules/cards/infra/typeorm/entities/Card';
import Payment from '@modules/payments/infra/typeorm/entities/Payment';
import Received from '@modules/received/infra/typeorm/entities/Received';

@Entity('transactions')
class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'numeric', precision: 15, scale: 2 })
  value: number;

  @Column('varchar')
  description: string;

  @Column('varchar')
  type: string;

  @Column('integer')
  installment: number;

  @Column('uuid')
  payment_id: string;

  @OneToOne(() => Payment, payment => payment.transaction)
  @JoinColumn({ name: 'payment_id' })
  payment: Payment;

  @OneToMany(() => Received, received => received.transaction)
  @JoinColumn({ name: 'id', referencedColumnName: 'transaction_id' })
  received: Received[];
}
export default Transaction;
