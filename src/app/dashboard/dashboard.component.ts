import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../web-socket.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  coreUsage: number[];
  containers: any[];
  selectedHost: string;

  memoryData: any;
  loadAverage: number[];

  connection;
  constructor(private webSocketService: WebSocketService, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.hostSelected.subscribe((host: string) => this.selectedHost = host);
    this.connection = this.webSocketService.getData().subscribe((data: any) => {
      console.log(data);
      this.dataService.hostData.emit({'name': data.hostname,
                                      'cpu': Math.floor(data.host.currentLoad.currentload * 100) / 100,
                                      'ram': data.host.mem.active / data.host.mem.total,
                                      'containersNumber': Object.keys(data.pack).length});

      // cpuLoad
      const coreUsage: number[] = data.host.currentLoad.cpus.map(core => core.load);

      // containers data
      const containers = data.pack;
      const containersList: object[] = Object.keys(containers).map(key => {
        return {'name': key,
                'memory_limit': Math.floor(data.pack[key].mem_limit / 1048576),
                'memory_percent': Math.floor(data.pack[key].mem_percent * 100) / 100,
                'cpu_percent': Math.floor(data.pack[key].cpu_percent * 100) / 100
              };
            });

      const mem = data.host.mem;
      const memoryUsage: object = {'totalMem': mem.total, 'freeMem': mem.free, 'bufferedMem': mem.buffcache, 'usedMem': mem.active};

      if (data['hostname'] === this.selectedHost) {
        this.coreUsage = coreUsage;
        this.containers = containersList;
        this.memoryData = memoryUsage;
      }
      // console.log(this.package);
      // console.log(this.package.cpus);
      // console.log(typeof(this.package.cpus));
      // let keys = Object.keys(this.package.cpus).forEach(key => console.log(this.package.cpus[key].percent.user))
      // console.log(data.cpus)
      // console.log(typeof(data.cpus))
      // // this.package.cpus = data.cpus[1]
      // console.log(data.freemem)
      // console.log(typeof(data.freemem))
      // console.log(typeof(this.freememory))
      // this.freememory = data.freemem;
      // console.log(this.freememory)
    });
  }

}