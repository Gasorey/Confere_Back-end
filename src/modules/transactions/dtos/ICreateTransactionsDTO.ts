export default interface ICreateTransactionsDTO {
  payment_id: string;
  value: number;
  description: string;
  type: 'debit' | 'credit' | 'installment_credit';
  installment: undefined | number;
  card_id?: string;
}
