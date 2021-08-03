import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {SharedModule} from '../../shared/shared.module';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { GaugesModule } from '@progress/kendo-angular-gauges';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { GridModule , ExcelModule } from '@progress/kendo-angular-grid';
import 'hammerjs';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    GaugesModule,
    InputsModule,
    DropDownsModule,
    GridModule,
    ExcelModule,
    ChartsModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
