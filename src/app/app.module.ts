import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DeliveryListComponent } from './delivery/delivery-list/delivery-list.component';
import { DeliveryCreateComponent } from './delivery/delivery-create/delivery-create.component';
import { DeliveryService } from './delivery/delivery.service';


@NgModule({
  declarations: [
    AppComponent,
    DeliveryListComponent,
    DeliveryCreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [DeliveryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
