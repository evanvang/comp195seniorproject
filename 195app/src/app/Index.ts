import { Component } from '@angular/core';
import { RouterOutlet, RouterModule} from '@angular/router';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<router-outlet>`,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './Index.html',
  styleUrl: './Index.css'
})
export class IndexComponent {
  title = '195app';
}
