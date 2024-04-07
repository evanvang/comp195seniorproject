import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  setDoc,
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { PersonInterface } from './my-profile/myprofile.interface';

@Injectable({ providedIn: 'root' })
export class PersonFirebaseService {
  firestore = inject(Firestore); // Inject Firestore service
  personCollection = collection(this.firestore, 'persons'); // Reference to the persons collection in Firestore

  // Fetches person details from Firestore and returns them as an Observable
  getPersonDetails(): Observable<PersonInterface[]> {
    return collectionData(this.personCollection, {
      idField: 'id', // Uses document ID as the ID field in the returned data
    }) as Observable<PersonInterface[]>;
  }

  // Adds a new person's details to Firestore and returns the document ID as an Observable
  addPersonDetails(name: string, bio: string, certs: string, other: string, projects: string, workexp: string): Observable<string> {
    const personDetailsToCreate = { name, bio, certs, other, projects, workexp }; // Includes the new name field
    const promise = addDoc(this.personCollection, personDetailsToCreate).then(
      (response) => response.id // Extracts and returns the new document ID
    );
    return from(promise);
  }

  // Removes a person's details from Firestore using their document ID
  removePersonDetail(personId: string): Observable<void> {
    const docRef = doc(this.firestore, 'persons/' + personId); // Creates a reference to the specific document
    const promise = deleteDoc(docRef); // Deletes the document
    return from(promise);
  }

  // Updates a person's details in Firestore using their document ID
  updatePersonDetails(
    personId: string,
    dataToUpdate: { name?: string; bio?: string; certs?: string; other?: string; projects?: string; workexp?: string }
  ): Observable<void> {
    const docRef = doc(this.firestore, 'persons/' + personId); // Creates a reference to the specific document
    const promise = setDoc(docRef, dataToUpdate, { merge: true }); // Updates the document with provided data, merging it with existing data
    return from(promise);
  }
}



// import { Injectable, inject } from '@angular/core';
// import {
//   Firestore,
//   addDoc,
//   collection,
//   collectionData,
//   deleteDoc,
//   doc,
//   setDoc,
// } from '@angular/fire/firestore';
// import { Observable, from } from 'rxjs';
// import { AboutPageInterface } from '../app/about-page.interface';

// @Injectable({ providedIn: 'root' })
// export class AboutPageFirebaseService {
//   firestore = inject(Firestore);
//   aboutPageCollection = collection(this.firestore, 'aboutPage');

//   getAboutPageContent(): Observable<AboutPageInterface[]> {
//     return collectionData(this.aboutPageCollection, {
//       idField: 'id',
//     }) as Observable<AboutPageInterface[]>;
//   }

//   updateBio(bio: string): Observable<void> {
//     const docRef = doc(this.firestore, 'aboutPage/bio');
//     const promise = setDoc(docRef, { bio });
//     return from(promise);
//   }

//   updateCerts(certs: string): Observable<void> {
//     const docRef = doc(this.firestore, 'aboutPage/certs');
//     const promise = setDoc(docRef, { certs });
//     return from(promise);
//   }

//   updateOther(other: string): Observable<void> {
//     const docRef = doc(this.firestore, 'aboutPage/other');
//     const promise = setDoc(docRef, { other });
//     return from(promise);
//   }

//   updateProjects(projects: string): Observable<void> {
//     const docRef = doc(this.firestore, 'aboutPage/projects');
//     const promise = setDoc(docRef, { projects });
//     return from(promise);
//   }

//   updateWorkExp(workexp: string): Observable<void> {
//     const docRef = doc(this.firestore, 'aboutPage/workexp');
//     const promise = setDoc(docRef, { workexp });
//     return from(promise);
//   }
// }
