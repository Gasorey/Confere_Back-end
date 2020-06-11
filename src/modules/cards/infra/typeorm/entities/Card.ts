import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

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

  @OneToMany(() => Transaction, transaction => transaction.id)
  transactions: Transaction[];
}

export default Card;
