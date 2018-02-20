import { Component, ViewChild, Input, OnChanges } from '@angular/core';

import { ChartComponent } from 'angular2-chartjs';

@Component({
  selector: 'app-ram-gauge',
  templateUrl: './ram-gauge.component.html',
  styleUrls: ['./ram-gauge.component.css']
})
export class RamGaugeComponent implements OnChanges {
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
  options = {
    legend: {
      position: 'right'
    },
    layout: {
      padding: 10
    }
  };

  constructor() { }

  byteToMega(number: number) {
    return Math.round(number / 1048576);
  }

  ngOnChanges() {
    this.data.datasets[0].data = [this.byteToMega(this.memoryData.usedMem),
                                  this.byteToMega(this.memoryData.bufferedMem),
                                  this.byteToMega(this.memoryData.freeMem)];
    this.chart.chart.update();
  }
}
