import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-work-area-list-task',
  standalone: true,
  imports: [],
  templateUrl: './work-area-list-task.component.html',
  styleUrl: './work-area-list-task.component.scss'
})
export class WorkAreaListTaskComponent {
  task_complete = signal<boolean>(true)



}
