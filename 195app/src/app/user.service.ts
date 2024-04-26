import { Injectable, inject } from "@angular/core";
import { Firestore, doc, docData, setDoc } from "@angular/fire/firestore";
import { ProfileUser } from "./my-profile/my-profile.interface";
import { Observable, from, of, switchMap } from "rxjs";
import { collection, getDocs, getFirestore, query, updateDoc, where } from "firebase/firestore";
import { AuthService } from "./auth.service";

@Injectable({providedIn:'root'})
export class UsersService{
    
    constructor(private firestore: Firestore, private authService: AuthService){}
    get currentUserProfile$(): Observable<ProfileUser | null>{
        return this.authService.currentUser$.pipe(
            switchMap((user) => {
                if(!user?.uid){
                    return of(null)
                }
                const ref = doc(this.firestore, 'users', user?.uid)
                return docData(ref) as Observable<ProfileUser>;
            })
        )
    }

   

    addUser(user: ProfileUser): Observable<void>{
        const ref = doc(this.firestore, 'users', user?.uid);
        return from(setDoc(ref, user));
    }
    updateUser(user: ProfileUser): Observable<void>{
        const ref = doc(this.firestore, 'users', user?.uid);
        return from(updateDoc(ref, { ...user}));
    }
    findUser(name: string): Observable<ProfileUser[]> {
        // Create a query against the 'users' collection where 'name' field matches the passed name
        const usersRef = collection(this.firestore, 'users');
        const q = query(usersRef, where('name', '==', name));
        
        // Execute the query and return an observable of ProfileUser[]
        return new Observable<ProfileUser[]>(observer => {
          getDocs(q)
            .then(snapshot => {
              const profiles = snapshot.docs.map(doc => doc.data() as ProfileUser);
              observer.next(profiles);
              observer.complete();
            })
            .catch(error => observer.error(error));
        });
      }
}