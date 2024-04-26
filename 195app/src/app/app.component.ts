import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { AuthService } from './auth.service';
import { UsersService } from './user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule], 
   templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = '195app';
  authService = inject(AuthService)
  usersService = inject(UsersService)
  user$ = this.usersService.currentUserProfile$;
  ngOnInit(): void{
    this.authService.user$.subscribe(user => {
      if(user){
        this.authService.currentUserSig.set({
          email: user.email!,
          username: user.displayName!
        });
      } else{
        this.authService.currentUserSig.set(null);
      }
      console.log(this.authService.currentUserSig());
    })
  }
  logout(): void{
    this.authService.logout();
  }
}
