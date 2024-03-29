import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './About.html',
  styleUrl: './About.css'
})
export class AboutComponent {
  title = '195app';
}
