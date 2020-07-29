import { NgModule } from '@angular/core';
import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeStartComponent,
        RecipeEditComponent,
        RecipeDetailComponent,
        RecipeListComponent,
        RecipeItemComponent
    ]
    ,
    exports: [],
    imports: [
        SharedModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        RecipesRoutingModule
    ]
})
export class RecipesModule { }