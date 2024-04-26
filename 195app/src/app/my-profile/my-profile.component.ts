import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { UsersService } from '../user.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthService } from '../auth.service';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NonNullableFormBuilder } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { concatMap, of, switchMap, tap } from 'rxjs';
import { ProfileUser } from './my-profile.interface';
import { ImageUploadService } from '../image-upload.service';
import { CommonModule } from '@angular/common';
import { Firestore } from '@angular/fire/firestore';
import { UserInfo } from 'os';
import { User } from 'firebase/auth';
@UntilDestroy()
@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, CommonModule, MatToolbarModule, MatIconModule],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent implements OnInit{
  toast = inject(HotToastService)
  usersService = inject(UsersService)
  authService = inject(AuthService)
  imageUploadService = inject(ImageUploadService)
  //fb = inject(NonNullableFormBuilder)
  user$ = this.usersService.currentUserProfile$
  profileForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      uid: [''],
      bio: [''],
      certs: [''],
      name: [''],
      other: [''],
      projects: [''],
      workexp: [''],
      photoURL: [''],
      resumeURL: ['']
    });
  }
   /*constructor(
    private toast: HotToastService,
    private usersService: UsersService,
    private fb: NonNullableFormBuilder
  ) {}*/
  ngOnInit(): void {
    this.usersService.currentUserProfile$
      .pipe(untilDestroyed(this), tap(console.log))
      .subscribe((user) => {
        this.profileForm.patchValue({ ...user });
      });
  }
 
  uploadFile(event: any) {
    const { uid, resumeURL } = this.profileForm.value;
    this.imageUploadService
      .uploadImage(event.target.files[0], `images/profile/${uid}`)
      .pipe(
        this.toast.observe({
          loading: 'Uploading profile image...',
          success: 'Image uploaded successfully',
          error: 'There was an error in uploading the image',
        }),
        switchMap((photoURL) =>
          this.usersService.updateUser({
            uid,
            photoURL,
          })
        )
      )
      .subscribe();
  }
  resumeUpload(event: any) {
    const { uid, resumeURL } = this.profileForm.value;
    this.imageUploadService
      .uploadImage(event.target.files[0], `resumes/profile/${uid}`)
      .pipe(
        this.toast.observe({
          loading: 'Uploading profile image...',
          success: 'Image uploaded successfully',
          error: 'There was an error in uploading the image',
        }),
        switchMap((resumeURL) =>
          this.usersService.updateUser({
            uid,
            resumeURL,
          })
        )
      )
      .subscribe();
  }
 saveProfile(){
  const { uid, bio, certs, name, other, projects, workexp } = this.profileForm.value;

    if (!uid) {
      return;
    }

    this.usersService
      .updateUser({ uid,  bio, certs, name, other, projects, workexp })
      .pipe(
        this.toast.observe({
          loading: 'Saving profile data...',
          success: 'Profile updated successfully',
          error: 'There was an error in updating the profile',
        })
      )
      .subscribe();
 }
}
