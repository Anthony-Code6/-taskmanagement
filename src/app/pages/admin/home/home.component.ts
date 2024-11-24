import { AfterViewInit, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { HomeWorkComponent } from "../../../components/admin/home/home-work/home-work.component";
import { RouterLink } from '@angular/router';
import { WorkService } from '../../../services/work.service';
import { Work } from '../../../interfaces/work';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeWorkComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

  works = signal<Work[]>([])
  private areaServices = inject(WorkService)

  ngOnInit(): void {
    this.sellWork()
  }

  ngOnDestroy(): void {
    this.works.set([])
  }


  async sellWork() {
    try {
      const response = await this.areaServices.sellstWork();
      this.works.set(response)
    } catch (err) {
      console.log(err);
    }
  }

  async dltWork(event: Work | undefined) {

    const validar = confirm(`Deseas eliminar el area de trabajo '${event?.titulo}'`)

    if (validar) {
      try {
        const id = event?.id as Number
        const response = await this.areaServices.dltWork(id);
        console.log(response);

        const updateWorks = this.works().filter((item) => item.id !== event?.id)
        this.works.set(updateWorks)

      } catch (err) {
        console.log(err);
      }

    }
  }

}
