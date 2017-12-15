import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class WebSocketService {


  constructor() { }

  private url = 'wss://ws.techbranch.net:/';
  private socket;

  askForData() {
    this.socket = io(this.url);
    this.socket.emit('who_is_active', () => console.log('asking who is active'));
  }

  changeInterval(interval) {
    this.socket.emit('change_frequency', {'interval': interval});
  }

  getData() {
    console.log('Firing getData');
    let observable = new Observable(observer => {
      console.log('Creating observable in getData');
      this.socket = io(this.url);
      this.socket.on('package', data => {
        console.log('Received package');
        observer.next(data);
      });
      return () => this.socket.disconnect();
    });
    return observable;
  }

  getHosts() {
    console.log('Firing getHosts');
    let observable = new Observable(observer => {
      console.log('Creating observable in getHosts');
      this.socket = io(this.url);
      this.socket.on('active_is', list => {
        console.log('Received list');
        observer.next(list);
      });
      return () => this.socket.disconnect()
    });
    return observable;
  }
}
