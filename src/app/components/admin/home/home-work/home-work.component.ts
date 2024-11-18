import { Component, input, output, signal } from '@angular/core';
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
  work = input<Work>()

  delete = output<Work | undefined>()


  deleteEvent() {
    this.delete.emit(this.work())
  }
}
