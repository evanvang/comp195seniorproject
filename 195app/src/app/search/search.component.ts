import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
import { UsersService } from '../user.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthService } from '../auth.service';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NavigationExtras } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NonNullableFormBuilder } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { concatMap, of, switchMap, tap } from 'rxjs';
import { ImageUploadService } from '../image-upload.service';
import { CommonModule } from '@angular/common';
import { Firestore } from '@angular/fire/firestore';
import { UserInfo } from 'os';
import { User } from 'firebase/auth';
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,  MatFormFieldModule, MatInputModule, MatButtonModule, CommonModule, MatToolbarModule, MatIconModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  usersService = inject(UsersService)
  searchName: string = "";
  userProfiles: any[] = [];
  selectedProfile: any = null;
  showForm: boolean = false;
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
      photoURL: ['']
    });
  }
  search() {
    this.showForm = false
    this.usersService.findUser(this.searchName).subscribe(
      profiles => {
        this.userProfiles = profiles;  // Store all profiles returned by the search
      },
      error => {
        console.error('Error fetching user profiles:', error);
      },
    );
  }

  /*selectProfile(profile: any) {
    this.selectedProfile = profile; // Store the selected profile
    this.profileForm.patchValue(profile); // Patch the form with the selected profile
    this.showForm = !this.showForm;
  }*/
  selectProfile(profileId: number) {
    // Find the profile with the matching ID
    const profile = this.userProfiles.find(p => p.uid === profileId);
  
    if (profile) {
      this.selectedProfile = profile; // Store the selected profile
      this.profileForm.reset({...profile}); // Patch the form with the selected profile
      if(!this.showForm){
      this.toggleForm(); // You can directly call toggleForm to flip the visibility
      }
    } else {
      console.error('Profile not found!');
    }
  }
  toggleForm() {
    this.showForm = !this.showForm;
  }
  formFalse(){
    this.showForm = false
  }
}
