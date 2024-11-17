import { Component } from '@angular/core';
import { HomeWorkComponent } from "../../../components/admin/home/home-work/home-work.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeWorkComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
