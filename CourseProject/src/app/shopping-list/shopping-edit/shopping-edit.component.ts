import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.modal';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
@ViewChild('name',{static:false}) ingredientName:ElementRef;
@ViewChild('amount',{static:false}) amount:ElementRef;
@Output() onIngredientAdded:EventEmitter<Ingredient>= new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  addIngredient()
  {
    this.onIngredientAdded.emit({amount:this.amount.nativeElement.value,name:this.ingredientName.nativeElement.value})
  }
}
