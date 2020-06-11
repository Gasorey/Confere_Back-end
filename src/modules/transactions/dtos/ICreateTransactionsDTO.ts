import Card from '@modules/cards/infra/typeorm/entities/Card';

export default interface ICreateTransactionsDTO {
  value: number;
  description: string;
  type: 'debit' | 'credit' | 'installment_credit';
  installment: string;
  card: Card;
}
