import { Component, inject } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { AuthService } from '../auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../user.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  fb = inject(FormBuilder)
  authService = inject(AuthService)
  router = inject(Router)
  usersService = inject(UsersService)
  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  })
  errorMessage: string | null = null;
  signUp(): void{
    const rawForm = this.form.getRawValue();
    //this.authService.register(rawForm.email, rawForm.username, rawForm.password).subscribe({ next:()=>{this.router.navigateByUrl('/about');},
    this.authService.register(rawForm.email, rawForm.username, rawForm.password).pipe(
      switchMap(({user: {uid}})=>
       this.usersService.addUser({
         uid,
         name: rawForm.username,
       })
    )
    ).subscribe({ next:()=>{this.router.navigateByUrl('/about');},
    error: (err)=>{
      this.errorMessage = err.code;
    }})
  }
}
