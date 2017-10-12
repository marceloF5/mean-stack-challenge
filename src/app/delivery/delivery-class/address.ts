import { Geo } from './geo';

export class Address {
  constructor(
    public streetName: string,
    public numberHouse: number,
    public neighborhood: string,
    public complement: string,
    public city: string,
    public state: string,
    public country: string,
    public geo: Geo,
  ) { }
}
