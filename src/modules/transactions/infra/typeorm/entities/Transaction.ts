import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import Card from '@modules/cards/infra/typeorm/entities/Card';

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

  @Column('varchar')
  installment: string;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('uuid')
  card_id: string;

  @ManyToOne(() => Card)
  @JoinColumn({ name: 'card_id' })
  card: Card;
}
export default Transaction;
