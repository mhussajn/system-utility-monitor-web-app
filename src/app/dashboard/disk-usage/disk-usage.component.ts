import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-disk-usage',
  templateUrl: './disk-usage.component.html',
  styleUrls: ['./disk-usage.component.css']
})
export class DiskUsageComponent {
  @Input() diskData: any;
  diskUsage: number;
}
