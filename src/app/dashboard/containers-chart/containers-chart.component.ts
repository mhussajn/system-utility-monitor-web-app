import { Component, OnInit, Input, ViewChild, OnChanges } from '@angular/core';
import { ChartComponent } from 'angular2-chartjs';

@Component({
  selector: 'app-containers-chart',
  templateUrl: './containers-chart.component.html',
  styleUrls: ['./containers-chart.component.css']
})
export class ContainersChartComponent implements OnInit, OnChanges {
  @ViewChild(ChartComponent) chart: ChartComponent;
  @Input() containers;
  constructor() { }
  type = 'line';
  data = {
    labels: [],
    datasets: []
  };

  options = {
    animation: false,
    legend: {
      display: false,
      position: 'bottom',
    },
    responsive: true,
    scales: {
      yAxes: [{
        stacked: true
      }]
    }
  };

  ngOnInit() {
    this.containers.forEach(container => {
        const color = (Math.random() * 0xFFFFFF<<0).toString(16);
        this.data.datasets.push({
        label: `${container.name}`,
        data: [],
        backgroundColor: ['#' + color],
        borderColor: ['#' + color],
        borderWidth: 2,
        fill: 'origin',
        cubicInterpolationMode: 'monotone',
        pointRadius: 2});
    });
  }

  ngOnChanges() {
    this.data.datasets.forEach((dataset, index) => {
      dataset.data.push(this.containers[index].cpu_percent);
    });
    this.data.labels.push(new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds());
    if (this.data.datasets[0].data.length > 20) {
      this.data.datasets.forEach((element, index) => {
        this.data.datasets[index].data.shift();
      });
      this.data.labels.shift();
    }
    this.chart.chart.update();
  }

}
