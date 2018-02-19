import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../web-socket.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  selectedHost: string;

  coreUsage: number[];
  containers: any[];
  memoryData: any;
  diskData: any;

  connection;

  constructor(private webSocketService: WebSocketService, private dataService: DataService) { }

  roundToMb(number) {
    return Math.floor(number / 1048576);
  }

  roundToPercent(number) {
    return Math.floor(number * 100) / 100;
  }

  ngOnInit() {
    this.dataService.hostSelected.subscribe((host: string) => this.selectedHost = host);
    this.connection = this.webSocketService.getData().subscribe((data: any) => {
      console.log(data);
      this.dataService.hostData.emit({'name': data.hostname,
                                      'cpu': this.roundToPercent(data.host.currentLoad.currentload),
                                      'ram': data.host.mem.active / data.host.mem.total,
                                      'containersNumber': Object.keys(data.pack).length,
                                      'uptime': data.host.time.uptime});

      const coreUsage: number[] = data.host.currentLoad.cpus.map(core => core.load);

      const containers = data.pack;
      const containersList: object[] = Object.keys(containers).map(key => {
        return {'name': key,
                'memory_limit': this.roundToMb(containers[key].mem_limit),
                'memory_percent': this.roundToPercent(containers[key].mem_percent),
                'cpu_percent': this.roundToPercent(containers[key].cpu_percent),
                'blockIO': {
                  'r': this.roundToMb(containers[key].blockIO.r),
                  'w': this.roundToMb(containers[key].blockIO.w)},
                'netIO': {
                  'r': this.roundToMb(containers[key].netIO.rx),
                  'w': this.roundToMb(containers[key].netIO.tx)},
                'pids': containers[key].pids
              };
            });

      const mem = data.host.mem;
      const memoryUsage: object = {
        'totalMem': mem.total,
        'freeMem': mem.free,
        'bufferedMem': mem.buffcache,
        'usedMem': mem.active};

      const storage = data.host.fsSize;
      const diskList: object[] = Object.keys(storage).map((key) => {
        return {
          'path': storage[key].fs,
          'size': this.roundToMb(storage[key].size),
          'used': this.roundToMb(storage[key].used),
          'usedPercent': this.roundToPercent(storage[key].used / storage[key].size)
        };
      });

      if (data['hostname'] === this.selectedHost) {
        this.coreUsage = coreUsage;
        this.containers = containersList;
        this.memoryData = memoryUsage;
        this.diskData = diskList;
      }
    });
  }

}
