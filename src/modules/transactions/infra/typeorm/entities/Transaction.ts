import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import Card from '@modules/cards/infra/typeorm/entities/Card';
import Payment from '@modules/payments/infra/typeorm/entities/Payment';

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
  card_id: string;

  @Column('uuid')
  payment_id: string;

  @OneToOne(() => Payment)
  @JoinColumn({ name: 'payment_id' })
  payment: Payment;

  @ManyToOne(() => Card)
  @JoinColumn({ name: 'card_id' })
  card: Card;
}
export default Transaction;
