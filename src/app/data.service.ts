import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class DataService {
  hostSelected = new EventEmitter<string>();
  hostData = new EventEmitter<any>();

  constructor() { }

}
