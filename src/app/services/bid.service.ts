import { inject, Injectable } from '@angular/core';
import { collection, collectionData, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { Bid } from '../class/bid';

@Injectable({
  providedIn: 'root'
})
export class BidService {
private firestore=inject(Firestore);
  bid=collection(this.firestore,'bid');

  public getBid():Observable<Bid[]>{
    return collectionData(this.bid,{idField:'uid'}) as Observable<Bid[]>
  }
  public updateBid(id: string, updatedData:{carId:string,holder:string,pholder:string}): Observable<void> {
    const docRef = doc(this.bid,`bid/${id}`);
    const promise = setDoc(docRef, updatedData); 
    return from(promise);
  }

}
