import { Component, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Work } from '../../../../interfaces/work';

@Component({
  selector: 'app-home-work',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home-work.component.html',
  styleUrl: './home-work.component.scss'
})
export class HomeWorkComponent {
  work = input<any>()
}
