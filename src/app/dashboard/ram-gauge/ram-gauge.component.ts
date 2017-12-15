import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core';

import { ChartComponent } from 'angular2-chartjs';

@Component({
  selector: 'app-ram-gauge',
  templateUrl: './ram-gauge.component.html',
  styleUrls: ['./ram-gauge.component.css']
})
export class RamGaugeComponent implements OnInit, OnChanges {
  @Input() memoryData: any;

  @ViewChild('ChartComponent') chart: ChartComponent;

  type = 'doughnut';
  data = {
    labels: ['Used Memory', 'Buffered Memory', 'Free Memory'],
    datasets: [{
      data: [],
      backgroundColor: ['#ff6384', '#36a2eb', '#27b4cd']
    }]
  };

  constructor() { }

  byteToMega(number: number) {
    return Math.round(number / 1048576);
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.data.datasets[0].data = [this.byteToMega(this.memoryData.usedMem),
                                  this.byteToMega(this.memoryData.bufferedMem),
                                  this.byteToMega(this.memoryData.freeMem)];
    this.chart.chart.update();
  }
}
