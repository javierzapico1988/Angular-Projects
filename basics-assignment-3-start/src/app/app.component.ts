import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayDetails:boolean=false;
  userClicks:string[]=[];

  showDetails(){
    this.displayDetails=true;
    this.userClicks.push('New Detail added on' + Date.now().toString() );}

    getBackgroundColor(index:number)
    {
      if (this.stylesEnabled(index)) return 'blue';}


    stylesEnabled(index:number):boolean
    {
      if(index>4)
       return true;
        return false}
}



