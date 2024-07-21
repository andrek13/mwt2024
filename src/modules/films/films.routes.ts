import { Routes } from '@angular/router';
import { FilmEditComponent } from './film-edit/film-edit.component';
import { authGuard } from '../../guards/auth.guard';
import { canDeactivateGuard } from '../../guards/can-deactivate.guard';
import { FilmEditChildComponent } from './film-edit-child/film-edit-child.component';
import { FilmMenuComponent } from './film-menu/film-menu.component';
import { FilmListComponent } from './film-list/film-list.component';

export const routes: Routes = [
  {path : '', component: FilmMenuComponent, children:[
    {path: '', component: FilmListComponent},
    {path: 'new', component: FilmEditComponent},
    {path: 'edit/:id', 
     component: FilmEditComponent, 
     canActivate:[authGuard],
     canDeactivate:[canDeactivateGuard]
    }
  ]}
];