import { Component, OnInit, Output, Input } from '@angular/core';
import { DataService } from '../../../data.service';

@Component({
  selector: 'app-active-host',
  templateUrl: './active-host.component.html',
  styleUrls: ['./active-host.component.css']
})
export class ActiveHostComponent implements OnInit {
  @Input() activeHost: string;
  cpuArray = [];
  cpuPercent: number;
  ramArray = [];
  ramPercent: number;
  containersNumber: number;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.hostData.subscribe(data => {
      if (data.name === this.activeHost) {
        this.cpuArray.push(data.cpu);
        this.ramArray.push(data.ram);
        if (this.cpuArray.length > 5) {
          this.cpuArray.shift();
          this.ramArray.shift();
        }

        this.cpuPercent = Math.floor(
        this.cpuArray.reduce((element, sum) => {
          return sum + element;
        }, 0) / this.cpuArray.length * 100) / 100;

        this.ramPercent = Math.floor(
        (this.ramArray.reduce((element, sum) => {
          return sum + element;
        }, 0) / this.ramArray.length) * 100 * 100 ) / 100;

        this.containersNumber = data.containersNumber;
      }
    });
  }

  onSelected() {
    this.dataService.hostSelected.emit(this.activeHost);
  }
}
