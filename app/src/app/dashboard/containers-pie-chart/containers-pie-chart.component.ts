import { Component, OnChanges, ViewChild, Input, OnInit  } from '@angular/core';
import { ChartComponent } from 'angular2-chartjs';

@Component({
  selector: 'app-containers-pie-chart',
  templateUrl: './containers-pie-chart.component.html',
  styleUrls: ['./containers-pie-chart.component.css']
})
export class ContainersPieChartComponent implements OnChanges, OnInit {
  @Input() containers: any;
  @ViewChild('ChartComponent') chart: ChartComponent;

    type = 'pie';
    data = {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: [],
        borderWidth: 0
      }]
    };
    options = {
      legend: false
    };

  constructor() { }

  ngOnInit() {
    this.containers.forEach(container => {
      this.data.labels.push(container.name);
      this.data.datasets[0].backgroundColor.push('#' + (Math.random() * 0xFFFFFF<<0).toString(16));
    });
  }

  ngOnChanges() {
    this.containers.forEach(container => {
      this.data.datasets[0].data.push((container.memory_percent / 100) * container.memory_limit);
    });
    this.chart.chart.update();
  }
}
