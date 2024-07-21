import { Component, inject, OnInit } from '@angular/core';
import { Film } from '../../../entities/film';
import { FilmEditChildComponent } from '../film-edit-child/film-edit-child.component';
import { FilmsService } from '../../../services/films.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from '../../../services/confirm.service';
import { CanDeactivateComponent } from '../../../guards/can-deactivate.guard';
import { map, Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-film-edit',
  standalone: true,
  imports: [FilmEditChildComponent],
  templateUrl: './film-edit.component.html',
  styleUrl: './film-edit.component.css'
})
export class FilmEditComponent implements OnInit, CanDeactivateComponent {
  filmService = inject(FilmsService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  confirmService = inject(ConfirmService);
  film: Film = new Film('', 0, '', '', [], [], {});
  saved = false;

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => params.get("id")),
      map(strId => Number(strId) || 0),
      switchMap(id => id ? this.filmService.getFilm(id) : of(new Film("", 0, "", "", [], [], {}))),
    ).subscribe(film => this.film = film);
  }
  
  
  filmSaved(film: Film) {
    this.saved = true;
    this.router.navigateByUrl("/films");
  }

  canDeactivate(): boolean | Observable<boolean> {
    if (this.saved) {
      return true;
    }
    return this.confirmService.confirm({
      title: "Editation not saved",
      question: "Film not saved, do you want to leave?"
    });
  }
}
