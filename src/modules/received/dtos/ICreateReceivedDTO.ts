export default interface ICreateReceivedDTO {
  value: number;
  transaction_id: string;
  status: string;
  received_date?: Date;
}
