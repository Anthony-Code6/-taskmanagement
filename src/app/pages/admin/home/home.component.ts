import { AfterViewInit, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { HomeWorkComponent } from "../../../components/admin/home/home-work/home-work.component";
import { RouterLink } from '@angular/router';
import { AreasService } from '../../../services/work.service';
import { Work } from '../../../interfaces/work';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeWorkComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy , AfterViewInit {

  work: Work[] = []
  private areaServices = inject(AreasService)

  ngOnInit(): void {
    this.sellWork()
  }

  ngOnDestroy(): void {
    this.areaServices.cleanWork()
  }

  ngAfterViewInit(): void {
    this.areaServices.getWork().subscribe({
      next: data => {
        this.work = data
      }, error: err => {
        //console.log(err);
      }
    })
  }

  async sellWork() {
    const response = await this.areaServices.sellstWork();
    if (response.error) {
      // Mensaje de Error
      //response.error.message;
    } else if (response.work) {
      response.work.forEach(element => {
        this.areaServices.setWork(element);
      });
    }
  }

  async dltWork(event: Work | undefined) {

    const validar = confirm(`Deseas eliminar el area de trabajo '${event?.titulo}'`)

    if(validar){
      const response = await this.areaServices.dltWork(event?.id);
      if (response.error) {
        //this.error = 'Error al eliminar el registro: ' + response.error.message;
      } else {
        //console.log('Registro eliminado correctamente');
        this.areaServices.removeWork(event?.id);
      }
    }
  }

}
