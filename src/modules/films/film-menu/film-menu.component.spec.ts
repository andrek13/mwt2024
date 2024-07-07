import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmMenuComponent } from './film-menu.component';

describe('FilmMenuComponent', () => {
  let component: FilmMenuComponent;
  let fixture: ComponentFixture<FilmMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilmMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
