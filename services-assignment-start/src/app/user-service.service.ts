import { Injectable } from '@angular/core';
import { CountService } from './count-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private activeUsers = ['Max', 'Anna'];
  private inactiveUsers = ['Chris', 'Manu'];


  addUser(id: number, active: boolean) {
    if (active) {
      this.activeUsers.push(this.inactiveUsers[id]);
      this.inactiveUsers.splice(id, 1);
    } else {
      this.inactiveUsers.push(this.activeUsers[id]);
      this.activeUsers.splice(id, 1);
    }
    this.counterService.increaseCount();
  }

  getActiveUsers(): string[] { return this.activeUsers; }
  getInactiveUsers(): string[] { return this.inactiveUsers; }

  constructor(private counterService: CountService) { }

}
