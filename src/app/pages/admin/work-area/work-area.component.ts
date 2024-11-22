import { Component } from '@angular/core';
import { WorkAreaPostTaskComponent } from "../../../components/admin/work-area/work-area-post-task/work-area-post-task.component";
import { WorkAreaListTaskComponent } from "../../../components/admin/work-area/work-area-list-task/work-area-list-task.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-work-area',
  standalone: true,
  imports: [WorkAreaPostTaskComponent, WorkAreaListTaskComponent,RouterLink],
  templateUrl: './work-area.component.html',
  styleUrl: './work-area.component.scss'
})
export class WorkAreaComponent {

}
