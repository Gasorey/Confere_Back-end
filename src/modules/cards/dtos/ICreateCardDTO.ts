export default interface ICreateCardDTO {
  transaction_id: string;
  number: string;
  expiry: Date;
  cvv: string;
  holder: string;
}
