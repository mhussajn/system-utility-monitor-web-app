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

  ngOnInit() {
    this.webSocket.askForData();
    this.connection = this.webSocket.getHosts().subscribe(list => {
      console.log('Received list');
      for (const key in list) {
        if (list.hasOwnProperty(key)) {
          this.activeHosts.push(list[key].name);
        }
      }
    });
  }
}
