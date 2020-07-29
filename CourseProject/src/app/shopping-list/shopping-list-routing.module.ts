import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { ShoppingListComponent } from './shopping-list.component';


const shoppingListRoutes: Routes = [
    {
        path: '', component: ShoppingListComponent,
        canActivate: [AuthGuard],
        children:
            [
                { path: 'shoppingList', component: ShoppingListComponent },
            ]
    },]

@NgModule(
    {
        imports: [RouterModule.forChild(shoppingListRoutes)],
        exports: [RouterModule]
    })
export class ShoppingListRoutingModule { }