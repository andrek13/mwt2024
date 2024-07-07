import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmEditChildComponent } from './film-edit-child.component';

describe('FilmEditChildComponent', () => {
  let component: FilmEditChildComponent;
  let fixture: ComponentFixture<FilmEditChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmEditChildComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilmEditChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
