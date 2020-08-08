import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { UpdateRecipes, AddRecipes } from '../store/recipe.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  private storeSub: Subscription;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>) { }
  ngOnDestroy(): void {
    if (this.storeSub)
      this.storeSub.unsubscribe();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    })


  }
  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    if (this.editMode) {
      this.storeSub = this.store.select('recipes').
        pipe(map(recipeState => {
          return recipeState.recipes.find((recipes, index) => { return index == this.id; })
        })).subscribe(recipe => {
          recipeName = recipe.name;
          recipeImagePath = recipe.imagePath;
          recipeDescription = recipe.description;
          if (recipe['ingredients']) {
            for (let ingredient of recipe.ingredients) {
              recipeIngredients.push(
                new FormGroup(
                  {
                    'name': new FormControl(ingredient.name, Validators.required),
                    'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
                  }));
            }
          }
        })
    }

    this.recipeForm = new FormGroup(
      {
        'name': new FormControl(recipeName, Validators.required),
        'imagePath': new FormControl(recipeImagePath, Validators.required),
        'description': new FormControl(recipeDescription, Validators.required),
        'ingredients': recipeIngredients,
      }
    )
  }
  getRecipeFormControlIngredients() {
    return (<FormArray>this.recipeForm.get('ingredients'))?.controls
  }

  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(new UpdateRecipes({ index: this.id, Recipe: this.recipeForm.value }));
    } else {
      this.store.dispatch(new AddRecipes(this.recipeForm.value));
    }
    this.onCancel();

  }
  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).controls.push
      (
        new FormGroup(
          {
            'name': new FormControl(null, Validators.required),
            'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
          })
      )
  }
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }
  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);

  }
}
