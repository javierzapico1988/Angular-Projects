import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountService {
  private counter: number = 0;

  getCounter(): number { return this.counter; }
  increaseCount() { this.counter++; }
  constructor() { }
}
