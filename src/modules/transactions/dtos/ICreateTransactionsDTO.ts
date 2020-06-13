interface Received {
  status: string;
  received_date?: Date;
}
interface Card {
  number: string;
  expiry: Date;
  cvv: string;
  holder: string;
}

export default interface ICreateTransactionsDTO {
  value: number;
  description: string;
  type: 'debit' | 'credit' | 'installment_credit';
  installment: number | undefined;
  card: Card;
  received: Received;
}
