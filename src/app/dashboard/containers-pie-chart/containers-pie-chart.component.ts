import { Component, AfterViewInit, ViewChild, Input  } from '@angular/core';
import { ChartComponent } from 'angular2-chartjs';

@Component({
  selector: 'app-containers-pie-chart',
  templateUrl: './containers-pie-chart.component.html',
  styleUrls: ['./containers-pie-chart.component.css']
})
export class ContainersPieChartComponent implements AfterViewInit {

  @ViewChild('ChartComponent') chart: ChartComponent;

  defaultColors = [ '#3366CC', '#DC3912', '#FF9900', '#109618', '#990099',
                    '#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E',
                    '#316395', '#994499', '#22AA99', '#AAAA11', '#6633CC',
                    '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC'];
    type = 'pie';
    data = {
      labels: ['Container1', 'Container2', 'Container3', 'Container4'],
      datasets: [{
        data: [15, 35, 20, 30],
        backgroundColor: []
      }]
    };
    options = {
      legend: false
    };

  constructor() { }

  ngAfterViewInit() {
    this.data.labels.forEach((element, index) => {
      this.data.datasets[0].backgroundColor.push(this.defaultColors[index]);
    });
    this.chart.chart.update();
    console.log(this.data.datasets[0].backgroundColor[0]);
  }

}
