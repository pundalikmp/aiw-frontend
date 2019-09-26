import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { BookVehicleComponent } from './book-vehicle/book-vehicle.component';
import { VehicleDetailComponent } from './book-vehicle/vehicle-detail/vehicle-detail.component';

@NgModule({
  imports: [
    CommonModule, SharedModule,
    DashboardRoutingModule,
  ],
  declarations: [DashboardComponent, BookVehicleComponent, VehicleDetailComponent]
})
export class DashboardModule { }
