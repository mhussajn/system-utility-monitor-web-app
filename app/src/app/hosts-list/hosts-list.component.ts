import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WebSocketService } from '../web-socket.service';

@Component({
  selector: 'app-hosts-list',
  templateUrl: './hosts-list.component.html',
  styleUrls: ['./hosts-list.component.css']
})
export class HostsListComponent implements OnInit {
  @ViewChild('intervalInput') intervalInputRef: ElementRef;
  interval = 2;

  constructor(private webSocket: WebSocketService) { }

  ngOnInit() {
  }

  onChangeInterval() {
    const newInterval = this.intervalInputRef.nativeElement.value;
    this.webSocket.changeInterval(newInterval * 1000);
    this.interval = newInterval;
    this.intervalInputRef.nativeElement.value = '';
  }
}
