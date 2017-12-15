import { Component, OnInit, ViewChild, AfterViewInit, Input, OnChanges, ElementRef } from '@angular/core';
import { ChartComponent } from 'angular2-chartjs';

@Component({
  selector: 'app-cpu-chart',
  templateUrl: './cpu-chart.component.html',
  styleUrls: ['./cpu-chart.component.css']
})
export class CpuChartComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild(ChartComponent) chart: ChartComponent;
  @ViewChild('shiftInput') shiftInputRef: ElementRef;
  @Input() cpuUsage: number[];
  shift = 1000;

  type = 'line';
  data = {
    labels: [],
    datasets: []
  };
  options = {
    responsive: true,
    mainAspectRatio: false,
    animation: false
  };

  constructor() { }

  ngOnInit() {
    this.cpuUsage.forEach((core, index) => {
      const color = (Math.random() * 0xFFFFFF<<0).toString(16);
      this.data.datasets.push({
        label: `Core ${index + 1}`,
        data: [],
        backgroundColor: ['#' + color ],
        borderColor: ['#' + color ],
        borderWidth: 2,
        fill: false,
        cubicInterpolationMode: 'monotone',
        pointRadius: 1});
    });
  }

  onChangeShift() {
    const shift = this.shiftInputRef.nativeElement.value;
    this.shiftInputRef.nativeElement.value = '';
    this.shift = shift;
  }

  ngOnChanges() {
    this.data.datasets.forEach((element, index) => {
      this.data.datasets[index].data.push(this.cpuUsage[index]);
    });
    this.data.labels.push(new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds());
    if (this.data.datasets[0].data.length > this.shift) {
      this.data.datasets.forEach((element, index) => {
        this.data.datasets[index].data.shift();
      });
      this.data.labels.shift();
    }
    this.chart.chart.update();
  }

  ngAfterViewInit() {
  }
}
