import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Film } from '../../../entities/film';
import { FilmsService } from '../../../services/films.service';
import { Person } from '../../../entities/person';
import { Postava } from '../../../entities/postava';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-film-edit-child',
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './film-edit-child.component.html',
  styleUrl: './film-edit-child.component.css'
})
export class FilmEditChildComponent implements OnChanges {
  @Input() film: Film = new Film("", 0, "", "", [], [], {});
  @Input() saveToServer: boolean = false;
  @Output() filmChange = new EventEmitter<Film>();
  filmService = inject(FilmsService);
  route = inject(ActivatedRoute);
  
  editForm = new FormGroup({
    nazov: new FormControl('', Validators.required),
    rok: new FormControl(0, [
      Validators.required,
      Validators.min(1895),
      Validators.max(new Date().getFullYear()),
    ]),
    slovenskyNazov: new FormControl(''),
    imdbID: new FormControl(''),
    reziser: new FormArray([]),
    postava: new FormArray([]),
    poradieVRebricku: new FormGroup({
      'AFI 1998': new FormControl(null, Validators.min(1)),
      'AFI 2007': new FormControl(null, Validators.min(1)),
    }),
  });

  ngOnChanges(changes: SimpleChanges): void {
   this.route.paramMap.pipe(
    map(params => Number(params.get("id"))),
    tap(id => this.filmService.getFilm(id)),
    switchMap((id) => id ? this.filmService.getFilm(id) : of(new Film("", 0, "", "", [], [], {}))
     
   )
  ).subscribe((film) => {this.film = film; this.initializeFormWithFilmData();});
  }

  initializeFormWithFilmData(): void {
    this.editForm.patchValue({
      nazov: this.film.nazov,
      rok: this.film.rok,
      slovenskyNazov: this.film.slovenskyNazov,
      imdbID: this.film.imdbID,
      poradieVRebricku: this.film.poradieVRebricku,
    });

    const reziserArray = this.editForm.get('reziser') as FormArray;
    reziserArray.clear();
    this.film.reziser.forEach((person) => {
      reziserArray.push(this.createPersonFormGroup(person));
    });

    const postavaArray = this.editForm.get('postava') as FormArray;
    postavaArray.clear();
    this.film.postava.forEach((postava) => {
      postavaArray.push(this.createPostavaFormGroup(postava));
    });
  }

  createPersonFormGroup(person: Person): FormGroup {
    return new FormGroup({
      id: new FormControl(person.id),
      krstneMeno: new FormControl(person.krstneMeno),
      stredneMeno: new FormControl(person.stredneMeno),
      priezvisko: new FormControl(person.priezvisko),
    });
  }

  createPostavaFormGroup(postava: Postava): FormGroup {
    return new FormGroup({
      postava: new FormControl(postava.postava),
      dolezitost: new FormControl(postava.dolezitost),
      herec: this.createPersonFormGroup(postava.herec),
    });
  }

  submit(): void {
    if (this.editForm.valid) {
      const updatedFilm = this.prepareFilmDataFromForm();
      this.filmService.saveFilm(updatedFilm).subscribe();
    }
  }

  prepareFilmDataFromForm(): Film {
    return Film.fromFormData(this.editForm.value);
  }

  get nazov(): FormControl {
    return this.editForm.get('nazov') as FormControl;
  }
  get rok(): FormControl {
    return this.editForm.get('rok') as FormControl;
  }
  get slovenskyNazov(): FormControl {
    return this.editForm.get('slovenskyNazov') as FormControl;
  }
  get imdbID(): FormControl {
    return this.editForm.get('imdbID') as FormControl;
  }
  get reziser(): FormArray {
    return this.editForm.get('reziser') as FormArray;
  }
  get postava(): FormArray {
    return this.editForm.get('postava') as FormArray;
  }
  get poradieVRebricku(): FormGroup {
    return this.editForm.get('poradieVRebricku') as FormGroup;
  }

}
