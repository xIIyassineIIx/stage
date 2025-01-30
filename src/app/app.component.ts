import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from "./components/menu/menu.component";
import { AcceuilComponent } from "./components/acceuil/acceuil.component";
import { DescriptionComponent } from "./components/description/description.component";
import { AccountsService } from './services/accounts.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, AcceuilComponent, DescriptionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  
  authservice=inject(AccountsService);
  ngOnInit(): void {
      this.authservice.user$.subscribe(user=>{
        if(user){
          this.authservice.currentUserSig.set({
            UID:user.uid,
            email:user.email!,
            username:user.displayName!,
          });
        }else{
          this.authservice.currentUserSig.set(null)
        }
        console.log(this.authservice.currentUserSig())
      })
    }
}
