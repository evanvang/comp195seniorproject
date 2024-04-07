import { Injectable, signal } from '@angular/core';
import { PersonInterface } from './my-profile/myprofile.interface';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  personDetailsSig = signal<PersonInterface[]>([]);

  addPersonDetails(bio: string, certs: string, other: string, projects: string, workexp: string, name: string, id: string): void {
    const newPersonDetails: PersonInterface = {
      bio,
      certs,
      other,
      projects,
      workexp,
      name, // Add name here
      id,
    };
    this.personDetailsSig.update((details) => [...details, newPersonDetails]);
  }

  updatePersonDetails(id: string, dataToUpdate: { bio?: string; certs?: string; other?: string; projects?: string; workexp?: string; name?: string }): void {
    this.personDetailsSig.update((details) =>
      details.map((detail) => 
        detail.id === id ? { ...detail, ...dataToUpdate } : detail
      )
    );
  }

  removePersonDetail(id: string): void {
    this.personDetailsSig.update((details) => details.filter((detail) => detail.id !== id));
  }
}



// import { Injectable, signal } from '@angular/core';
// import { AboutPageInterface } from '../app/about-page.interface';

// @Injectable({
//   providedIn: 'root',
// })
// export class AboutService {
//   aboutPageSig = signal<AboutPageInterface>({
//     bio: '',
//     certs: '',
//     other: '',
//     projects: '',
//     workexp: '',
//   });

//   updateBio(bio: string): void {
//     this.aboutPageSig.update((aboutPage) => ({ ...aboutPage, bio }));
//   }

//   updateCerts(certs: string): void {
//     this.aboutPageSig.update((aboutPage) => ({ ...aboutPage, certs }));
//   }

//   updateOther(other: string): void {
//     this.aboutPageSig.update((aboutPage) => ({ ...aboutPage, other }));
//   }

//   updateProjects(projects: string): void {
//     this.aboutPageSig.update((aboutPage) => ({ ...aboutPage, projects }));
//   }

//   updateWorkExp(workexp: string): void {
//     this.aboutPageSig.update((aboutPage) => ({ ...aboutPage, workexp }));
//   }
// }
