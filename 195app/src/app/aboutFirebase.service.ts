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
import { PersonInterface } from '../../src/app/about-page.interface';

@Injectable({ providedIn: 'root' })
export class PersonFirebaseService {
  firestore = inject(Firestore);
  personCollection = collection(this.firestore, 'persons');

  getPersonDetails(): Observable<PersonInterface[]> {
    return collectionData(this.personCollection, {
      idField: 'id',
    }) as Observable<PersonInterface[]>;
  }

  addPersonDetails(bio: string, certs: string, other: string, projects: string, workexp: string): Observable<string> {
    const personDetailsToCreate = { bio, certs, other, projects, workexp };
    const promise = addDoc(this.personCollection, personDetailsToCreate).then(
      (response) => response.id
    );
    return from(promise);
  }

  removePersonDetail(personId: string): Observable<void> {
    const docRef = doc(this.firestore, 'persons/' + personId);
    const promise = deleteDoc(docRef);
    return from(promise);
  }

  updatePersonDetails(
    personId: string,
    dataToUpdate: { bio: string; certs: string; other: string; projects: string; workexp: string }
  ): Observable<void> {
    const docRef = doc(this.firestore, 'persons/' + personId);
    const promise = setDoc(docRef, dataToUpdate);
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
