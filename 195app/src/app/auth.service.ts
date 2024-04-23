import { Injectable, inject, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential, signOut, updateProfile, user, authState} from '@angular/fire/auth';
import { response } from 'express';
import { Observable, from } from 'rxjs';
import { UserInterface } from './user.interface';
@Injectable({
  providedIn: 'root'
})
export class AuthService{
  firebaseAuth = inject(Auth)
  user$ = user(this.firebaseAuth)
  currentUser$ = authState(this.firebaseAuth);
  currentUserSig = signal<UserInterface | null | undefined>(undefined)


  /*register(email:string, username: string, password: string): Observable<void>{
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password).then(response => updateProfile(response.user, {displayName: username}))
    return from(promise)
  }*/

  register(email:string, username: string, password: string): Observable<UserCredential>{
    return from(createUserWithEmailAndPassword(this.firebaseAuth, email, password))
  }

  login(email:string, password:string): Observable<void>{
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password,
    ).then(()=> {});
    return from(promise);
   /* return from(signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password,
    ))*/
  }
  logout(): Observable<void>{
    const promise = signOut(this.firebaseAuth)
    return from(promise);
  }
}