import { Component } from '@angular/core';
import { UserService } from './user-service.service';
import { CountService } from './count-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private userService: UserService, private countService: CountService) { }
  onSetToInactive(id: number) {
    this.userService.addUser(id, false);
  }

  onSetToActive(id: number) {
    this.userService.addUser(id, true);
  }
  getActiveUsers(): string[] {
    return this.userService.getActiveUsers();
  }
  getInactiveUsers(): string[] {
    return this.userService.getInactiveUsers();
  }
  getCount() { return this.countService.getCounter(); }
}
