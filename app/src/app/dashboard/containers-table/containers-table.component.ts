import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-containers-table',
  templateUrl: './containers-table.component.html',
  styleUrls: ['./containers-table.component.css']
})
export class ContainersTableComponent implements OnChanges {
  @Input() containers: any[];
  mean: number;
  totalRamUsage: number;
  constructor() { }

  ngOnChanges() {
    this.mean = Math.floor(this.containers.reduce((sum, container) => sum + container.cpu_percent, 0) * 100) / 100;
    this.totalRamUsage = Math.floor((this.containers.reduce((sum, container) =>
      sum + ((container.memory_percent / 100) * container.memory_limit), 0)));
  }

}
