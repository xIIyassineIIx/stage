import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { Carlist } from '../class/carlist';
import { Message } from '../class/message';
@Injectable({
  providedIn: 'root'
})
export class ConnexionService {
  private firestore=inject(Firestore);
  carlist=collection(this.firestore,'Carlist');
  message=collection(this.firestore,'message');
  public getcars():Observable<Carlist[]>{
    return collectionData(this.carlist,{idField:'uid'}) as Observable<Carlist[]>
  }
  public updateCar(id: string, updatedData:{uid:string,id:number,vin:string,odometre:number,primaryDamage:string,estimated:number,engineType:string,transmission:string,drive:string,type:string,bidStatus:string,currentBid:string,image:string[],location:string,date:string,model:string,brand:string,color:string,highlight:string,holder:string}): Observable<void> {
    const docRef = doc(this.firestore,`Carlist/${id}`);
    const promise = setDoc(docRef, updatedData); 
    return from(promise);
  }




  public getconversation():Observable<Message[]>{
    return collectionData(this.message,{idField:'id'}) as Observable<Message[]>
  }
  public updateconversation(id:string, updateddata:{idResever:string,idSender:string,message:string[]}):Observable<void>{
    const docref=doc(this.firestore,"message/"+id);
    const promis=setDoc(docref,updateddata)
    return from(promis)
   }
   public addconversation(msg:any):Observable<any>{
    const promis=addDoc(this.message,msg)
    return from(promis);
   }
}
