import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartModule } from 'angular2-chartjs';

// Importing services
import { WebSocketService } from './web-socket.service';
import { DataService } from './data.service';

import { AppComponent } from './app.component';
import { HostsListComponent } from './hosts-list/hosts-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ActiveHostsListComponent } from './hosts-list/active-hosts-list/active-hosts-list.component';
import { ActiveHostComponent } from './hosts-list/active-hosts-list/active-host/active-host.component';
import { CpuChartComponent } from './dashboard/cpu-chart/cpu-chart.component';
import { RamGaugeComponent } from './dashboard/ram-gauge/ram-gauge.component';
import { ContainersTableComponent } from './dashboard/containers-table/containers-table.component';
import { ContainersPieChartComponent } from './dashboard/containers-pie-chart/containers-pie-chart.component';
import { ContainersChartComponent } from './dashboard/containers-chart/containers-chart.component';
import { DiskUsageComponent } from './dashboard/disk-usage/disk-usage.component';

@NgModule({
  declarations: [
    AppComponent,
    HostsListComponent,
    DashboardComponent,
    ActiveHostsListComponent,
    ActiveHostComponent,
    CpuChartComponent,
    RamGaugeComponent,
    ContainersTableComponent,
    ContainersPieChartComponent,
    ContainersChartComponent,
    DiskUsageComponent,
  ],
  imports: [
    BrowserModule,
    ChartModule
  ],
  providers: [WebSocketService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
