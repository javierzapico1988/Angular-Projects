import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { AuthComponent } from './auth.component';
const authRoutes: Routes = [

    { path: 'auth', component: AuthComponent }
];

@NgModule({
    imports: [RouterModule.forChild(authRoutes)],
    exports: [RouterModule]
})

export class AuthRoutingModule { }