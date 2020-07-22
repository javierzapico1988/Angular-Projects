import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.modal';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  @ViewChild('f', { static: false }) form: NgForm;
  constructor(private shoppingListService: ShoppingListService) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe((index: number) => {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.shoppingListService.getIngredient(index);
      this.form.setValue({ name: this.editedItem.name, amount: this.editedItem.amount })
    })
  }
  onSubmit(form: NgForm) {
    const value = form.value;

    if (this.editMode) {
      this.shoppingListService.editIngredient(this.editedItemIndex, {
        name: value.name,
        amount: value.amount
      })
    } else {
      this.shoppingListService.addIngredient({
        name: value.name,
        amount: value.amount
      })

    }
    this.editMode = false;
    this.form.reset();

  }
}
