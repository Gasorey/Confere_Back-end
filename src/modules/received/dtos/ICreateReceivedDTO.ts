export default interface ICreateReceivedDTO {
  transaction_id: string;
  status: string;
  received_date?: Date;
}
