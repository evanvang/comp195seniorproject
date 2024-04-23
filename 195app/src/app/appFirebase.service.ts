import { Injectable, inject } from "@angular/core";
import { Firestore, collection, collectionData } from "@angular/fire/firestore";
import { Interface } from "readline";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class appFirebaseService {
    firestore = inject(Firestore);
    appCollection = collection(this.firestore, 'app')

    getApp(): Observable<Interface[]> {
        return collectionData(this.appCollection, {
            idField: 'id'
        }) as Observable<Interface[]>;
    } 
}