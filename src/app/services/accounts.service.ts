import { inject, Injectable, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, user } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { Users } from '../class/users';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
    firebaseauth=inject(Auth);
    user$=user(this.firebaseauth)
    currentUserSig=signal<Users|null|undefined>(undefined);
    register(email:string,username:string,password:string):Observable<void>{
      const promis=createUserWithEmailAndPassword(this.firebaseauth,email,password)
      .then(rep=>updateProfile(rep.user,{displayName:username,}))
      return from(promis)
    }
    login(email:string,password:string):Observable<void>{
      const promis=signInWithEmailAndPassword(this.firebaseauth,email,password)
      .then(()=>{})
      return from(promis)
    }
    logout():Observable<void>{
      const promis=signOut(this.firebaseauth);
      return from(promis);
    }
}
