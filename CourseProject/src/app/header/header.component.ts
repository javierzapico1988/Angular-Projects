import {
    Component, OnInit
}
    from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';

@Component({ selector: 'app-header', templateUrl: 'header.component.html', styles: ['header.component.css'] }) export class HeaderComponent implements OnInit {
    constructor(private recipeService: RecipeService) { }
    ngOnInit(): void { }
    public collapszed = true;

    onSaveData() {
        this.recipeService.saveAllRecipes(this.recipeService.getRecipes())
    }


    onFetchData() { this.recipeService.getRecipesFromServer() }
}
