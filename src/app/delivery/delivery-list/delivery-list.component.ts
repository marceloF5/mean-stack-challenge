import { Component, OnInit } from '@angular/core';

import { DeliveryService } from '../delivery.service';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.css']
})
export class DeliveryListComponent implements OnInit {

  private deliveries: any[] = [];
  private totalCustomers = 0;
  private totalWeight = 0;
  private avg = 0;

  constructor(private deliveriesService: DeliveryService) { }

  ngOnInit() {
    this.deliveriesService.eventEmitterDelete.subscribe(
      data => this.deliveries = data);

    this.deliveriesService.eventEmitterCreate.subscribe(
      data => {
        this.deliveries = data;
        this.totalCustomers = this.deliveries.length;
        this.totalWeight = 0;
        for (let i = 0; i < this.deliveries.length; i++) {
          // tslint:disable-next-line:radix
          this.totalWeight += parseInt(this.deliveries[i].weight);
        }
        this.avg = this.totalWeight / this.totalCustomers;
      });

    this.deliveries = this.deliveriesService.getAllDeliveries();
    //this.totalCustomers = this.deliveries.length;

    // tslint:disable-next-line:forin
    for (let i = 0; i < this.deliveries.length; i++) {
      this.totalWeight += this.deliveries[i].weight;
    }

    this.avg = this.totalWeight / this.totalCustomers;
  }

}
