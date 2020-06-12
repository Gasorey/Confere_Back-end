export default interface ICreateTransactionsDTO {
  value: number;
  description: string;
  type: 'debit' | 'credit' | 'installment_credit';
  installment: string;
}
