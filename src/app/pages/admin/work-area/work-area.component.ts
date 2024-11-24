import { AfterViewInit, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { WorkAreaPostTaskComponent } from "../../../components/admin/work-area/work-area-post-task/work-area-post-task.component";
import { WorkAreaListTaskComponent } from "../../../components/admin/work-area/work-area-list-task/work-area-list-task.component";
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { WorkService } from '../../../services/work.service';
import { Task } from '../../../interfaces/task';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-work-area',
  standalone: true,
  imports: [WorkAreaPostTaskComponent, WorkAreaListTaskComponent, RouterLink],
  templateUrl: './work-area.component.html',
  styleUrl: './work-area.component.scss'
})
export class WorkAreaComponent implements OnInit, OnDestroy {

  tasks = signal<Task[]>([])

  private taskService = inject(TaskService)

  private router = inject(ActivatedRoute)
  private route = inject(Router)
  private workServices = inject(WorkService)

  ngOnInit(): void {
    this.router.params.subscribe((parans) => {
      this.getWork(parans['id'])
    })
  }

  ngOnDestroy(): void {
    this.tasks.set([])
  }

  async getWork(id: number) {
    try {
      const response = await this.workServices.gettWork(id);
      this.sellstTask(id)

    } catch (err) {
      this.route.navigate(['administrador/home'])
    }
  }

  postTask(task: Task) {
    console.log(task);
  }

  async sellstTask(task_id: number) {
    try {
      const response = await this.taskService.sellstTask(task_id);
      this.tasks.set(response)
    } catch (err) {
      console.error(err);
    }
  }



}
