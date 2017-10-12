import { Address } from './address';

export class Delivery {
  constructor (
    public id: number,
    public customerName: string,
    public weight: number,
    public address: Address
  ) { }
}
