import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './MyProfile.html',
  styleUrl: './app.component.css'
})
export class MyProfileComponent {
  title = '195app';
}
