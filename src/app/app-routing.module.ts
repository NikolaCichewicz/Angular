import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import {UsersComponent} from './components/users/users.component';
// import { RowComponent } from "./components/row/row.component";

const routes: Routes = [
  { path: '', component: UsersComponent },
  { path: 'add', component: RegisterFormComponent },
  { path: 'edit', component: RegisterFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
