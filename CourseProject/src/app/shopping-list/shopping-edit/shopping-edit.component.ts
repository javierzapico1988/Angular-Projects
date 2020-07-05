import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('name', { static: false }) ingredientName: ElementRef;
  @ViewChild('amount', { static: false }) amount: ElementRef;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }
  addIngredient() {
    this.shoppingListService.addIngredient({ amount: this.amount.nativeElement.value, name: this.ingredientName.nativeElement.value })
  }
}
