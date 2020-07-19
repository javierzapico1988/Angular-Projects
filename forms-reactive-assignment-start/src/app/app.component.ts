import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  projectForm: FormGroup;
  availableStatuses: string[] = ['Stable', 'Critical', 'Finished'];
  ngOnInit(): void {
    this.projectForm = new FormGroup(
      {
        'projectName': new FormControl('', [Validators.required, this.projectNameRestrictionSync.bind(this)], this.projectNameRestrictionsAsync.bind(this)),
        'email': new FormControl('', [Validators.required, Validators.email]),
        'status': new FormControl(''),
      })
  }

  projectNameRestrictionSync(formControl: FormControl): { [s: string]: boolean } {
    if ((<string>formControl.value).toLowerCase() === 'test') {
      return { 'projectNameInvalid': true };
    }
  }
  projectNameRestrictionsAsync(formControl: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (formControl.value === 'test') {
          resolve({ 'projectNameInvalid': true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
  onSubmit() {
    console.log(this.projectForm)
  }
}
