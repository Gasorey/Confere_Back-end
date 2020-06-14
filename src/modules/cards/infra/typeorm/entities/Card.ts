import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';

@Entity('cards')
class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  number: string;

  @Column('timestamp')
  expiry: Date;

  @Column('varchar')
  cvv: string;

  @Column('varchar')
  holder: string;

  @Column('uuid')
  transaction_id: string;

  @ManyToOne(() => Transaction, transaction => transaction.id)
  @JoinColumn({ name: 'transaction_id' })
  transaction: Transaction;
}

export default Card;
