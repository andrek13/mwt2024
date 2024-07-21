import { Person } from "./person";
import { Postava } from "./postava";

export class Film {
  constructor(
    public nazov: string,
    public rok: number,
    public slovenskyNazov: string,
    public imdbID: string,
    public reziser: Person[],
    public postava: Postava[],
    public poradieVRebricku: {[name: string]: number},
    public id?: number
  ){}

  static clone(film: Film): Film {
    return new Film(
      film.nazov,
      film.rok,
      film.slovenskyNazov,
      film.imdbID,
      film.reziser,
      film.postava,
      film.poradieVRebricku,
      film.id
    );
  }

  static fromFormData(formData: any): Film {
    return new Film(
      formData.nazov || '',
      formData.rok || 0,
      formData.slovenskyNazov || '',
      formData.imdbID || '',
      formData.reziser || '',
      formData.postava || '',
      formData.poradieVRebricku || 0
    );
  }
}