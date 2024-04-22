import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core';
import { PersonInterface } from './myprofile.interface';
import { CommonModule } from '@angular/common';
import { PersonService } from '../about.service';
import { PersonFirebaseService } from '../aboutFirebase.service';

@Component({
  selector: 'app-person-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class MyProfileComponent implements OnInit, OnChanges {
  @Input({ required: true }) personDetails!: PersonInterface; // Input property for person details
  @Input({ required: true }) isEditing!: boolean; // Tracks if editing mode is active
  @Output() setEditingId: EventEmitter<string | null> = new EventEmitter(); // Emits the editing ID

  @ViewChild('textInput') textInput?: ElementRef; // Accesses the text input element

  // Services injection
  personService = inject(PersonService);
  personFirebaseService = inject(PersonFirebaseService);

  // Local state for editing
  editingName: string = '';
  editingBio: string = '';
  editingCerts: string = '';
  editingOther: string = '';
  editingProjects: string = '';
  editingWorkexp: string = '';

  ngOnInit(): void {
    // Initialize editing fields with current person details
    this.editingName = this.personDetails.name;
    this.editingBio = this.personDetails.bio;
    this.editingCerts = this.personDetails.certs;
    this.editingOther = this.personDetails.other;
    this.editingProjects = this.personDetails.projects;
    this.editingWorkexp = this.personDetails.workexp;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Focus on the text input when editing mode is activated
    if (changes['isEditing'].currentValue) {
      setTimeout(() => this.textInput?.nativeElement.focus(), 0);
    }
  }

  updatePersonDetails(): void {
    // Constructs the updated data object
    const dataToUpdate = {
      name: this.editingName,
      bio: this.editingBio,
      certs: this.editingCerts,
      other: this.editingOther,
      projects: this.editingProjects,
      workexp: this.editingWorkexp,
    };

    // Updates details in Firebase and local service
    this.personFirebaseService
      .updatePersonDetails(this.personDetails.id, dataToUpdate)
      .subscribe(() => {
        this.personService.updatePersonDetails(this.personDetails.id, dataToUpdate);
      });

    // Resets editing mode
    this.setEditingId.emit(null);
  }

  setPersonInEditMode(): void {
    // Sets the current person ID for editing
    this.setEditingId.emit(this.personDetails.id);
  }
}




// import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, inject } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { AboutPageInterface } from '../about-page.interface';
// import { AboutPageService } from '../about.service';
// import { AboutFirebaseService } from '../aboutFirebase.service';

// @Component({
//   selector: 'app-my-profile',
//   templateUrl: './my-profile.component.html',
//   styleUrls: ['./my-profile.component.css'],
//   standalone: true,
//   imports: [CommonModule],
// })
// export class MyProfileComponent implements OnInit, OnChanges {
//   @Input({ required: true }) aboutPage!: AboutPageInterface;
//   @Input({ required: true }) isEditing!: boolean;
//   @Output() setEditingId: EventEmitter<string | null> = new EventEmitter();

//   @ViewChild('textInput') textInput?: ElementRef;

//   aboutPageService = inject(AboutPageService);
//   aboutPageFirebaseService = inject(AboutPageFirebaseService);
//   editingText: string = '';

//   ngOnInit(): void {
//     this.editingText = this.aboutPage.bio;
//   }

//   ngOnChanges(changes: SimpleChanges): void {
//     if (changes['isEditing'].currentValue) {
//       setTimeout(() => {
//         this.textInput?.nativeElement.focus();
//       }, 0);
//     }
//   }

//   changeText(event: Event) {
//     const value = (event.target as HTMLInputElement).value;
//     this.editingText = value;
//   }

//   changeAboutPage(): void {
//     const dataToUpdate = {
//       bio: this.editingText,
//       certs: this.aboutPage.certs,
//       other: this.aboutPage.other,
//       projects: this.aboutPage.projects,
//       workexp: this.aboutPage.workexp,
//     };

//     this.about-pageFirebaseService
//       .updateBio(this.editingText)
//       .subscribe(() => {
//         this.aboutPageService.changeBio(this.editingText);
//       });

//     this.setEditingId.emit(null);
//   }

//   setAboutPageInEditMode(): void {
//     this.setEditingId.emit(this.aboutPage.bio);
//   }

//   removeAboutPage(): void {
//     // Assuming there's a method in the service to remove about page content
//     // this.aboutPageFirebaseService.removeAboutPage().subscribe(() => {
//     //   this.aboutPageService.removeAboutPage();
//     // });
//   }

  // Additional methods for updating other fields like certs, other, projects, and workexp
// }


// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-my-profile',
//   standalone: true,
//   imports: [],
//   templateUrl: './my-profile.component.html',
//   styleUrl: './my-profile.component.css'
// })
// export class MyProfileComponent {

// }
