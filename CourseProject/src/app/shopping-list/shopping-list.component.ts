import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.modal';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { StartEdit, AddIngredient } from './store/shopping-list.actions';
import { AppState } from '../app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  constructor(
    private store: Store<AppState>) { }


  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
  }

  addIngredient($event: Ingredient) { this.store.dispatch(new AddIngredient($event)) }

  onEditItem(index: number) {
    this.store.dispatch(new StartEdit(index));
  }
}
