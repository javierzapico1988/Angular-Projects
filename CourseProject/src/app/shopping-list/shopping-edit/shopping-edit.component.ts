import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.modal';
import { Store } from '@ngrx/store';
import { AddIngredient, UpdateIngredient, DeleteIngredient, StopEdit } from '../store/shopping-list.actions';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;
  @ViewChild('f', { static: false }) form: NgForm;
  constructor(private store: Store<AppState>) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new StopEdit());
  }

  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        this.form.setValue({ name: this.editedItem.name, amount: this.editedItem.amount })
      } else {
        this.editMode = false;
      }
    })
  }
  onSubmit(form: NgForm) {
    const value = form.value;

    if (this.editMode) {
      this.store.dispatch(new UpdateIngredient({ ingredient: value }))
    } else {
      this.store.dispatch(new AddIngredient({ name: value.name, amount: value.amount }))
    }
    this.onClear()
  }
  onClear() {
    this.form.reset();
    this.editMode = false;
    this.store.dispatch(new StopEdit());
  }
  onDelete() {
    this.store.dispatch(new DeleteIngredient());
    this.onClear();
  }
}
