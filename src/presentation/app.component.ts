import { Component, inject } from '@angular/core';
import { WeatherforecastService } from '../core/data/repositories/weatherforecast.service';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from "./layouts/menu.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterOutlet, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontAPI';
 
  
}
