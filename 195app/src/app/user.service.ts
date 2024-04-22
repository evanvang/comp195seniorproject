import { Injectable } from "@angular/core";
import { Firestore, doc, docData, setDoc } from "@angular/fire/firestore";
import { ProfileUser } from "./my-profile/my-profile.interface";
import { Observable, from, of, switchMap } from "rxjs";
import { updateDoc } from "firebase/firestore";
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
}