import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../web-socket.service';

@Component({
  selector: 'app-active-hosts-list',
  templateUrl: './active-hosts-list.component.html',
  styleUrls: ['./active-hosts-list.component.css']
})
export class ActiveHostsListComponent implements OnInit {
  connection;

  activeHosts: string[] = [];

  constructor(private webSocket: WebSocketService) { }

  onRefresh() {
    this.webSocket.askForData();
  }

  ngOnInit() {
    this.webSocket.askForData();
    this.connection = this.webSocket.getHosts().subscribe(list => {
      console.log('Received list');
      const hosts = [];
      for (const key in list) {
        if (list.hasOwnProperty(key)) {
          hosts.push(list[key].name);
        }
      }
      this.activeHosts = hosts;
    });
  }
}
