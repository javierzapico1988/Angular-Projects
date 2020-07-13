import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
const appRoutes: Routes = [
    {
        path: 'recipes', component: RecipesComponent,
        children:
            [
                { path: '', component: RecipeStartComponent },
                { path: ':id', component: RecipeDetailComponent }
            ]
    },
    { path: 'shoppingList', component: ShoppingListComponent },
    { path: '', redirectTo: '/recipes', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRouting { }