import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeTestComponent } from './home-test/home-test.component';
import { GridCssComponent } from './grid-css3/grid-css.component';

const routes: Routes = [

  {path: 'listafilmes', component: HomeTestComponent},
  {path: 'gridcss', component: GridCssComponent},
  {path: '', redirectTo: 'listafilmes', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
