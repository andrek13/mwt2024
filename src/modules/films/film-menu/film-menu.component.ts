import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-film-menu',
  standalone: true,
  imports: [RouterOutlet, MaterialModule, RouterLink, RouterLinkActive],
  templateUrl: './film-menu.component.html',
  styleUrl: './film-menu.component.css'
})
export class FilmMenuComponent {

}
