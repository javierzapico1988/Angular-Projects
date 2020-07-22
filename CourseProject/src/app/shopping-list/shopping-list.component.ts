import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.modal';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private idChangedSub: Subscription
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnDestroy(): void {
    this.idChangedSub.unsubscribe();
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients()
    this.idChangedSub = this.shoppingListService.ingredientsChanged.subscribe((recipeList: Ingredient[]) => { this.ingredients = recipeList; }
    )
  }

  addIngredient($event: Ingredient) { this.shoppingListService.addIngredient($event) }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }
}
