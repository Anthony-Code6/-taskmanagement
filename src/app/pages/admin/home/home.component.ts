import { AfterViewInit, Component, inject } from '@angular/core';
import { HomeWorkComponent } from "../../../components/admin/home/home-work/home-work.component";
import { RouterLink } from '@angular/router';
import { AreasService } from '../../../services/areas.service';
import { Work } from '../../../interfaces/work';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeWorkComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {

  work!: any[] | null | undefined
  private areaServices = inject(AreasService)

  async ngAfterViewInit() {
    const response = await this.areaServices.sellstWork();
    if (response.error) {
      console.log(response.error);

    } else {
      this.work = response.work
    }



  }

}
