import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmListComponent } from './film-list/film-list.component';
import { RouterModule } from '@angular/router';
import { routes } from './films.routes';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FilmListComponent,
    RouterModule.forChild(routes)
  ]
})
export class FilmsModule { }
