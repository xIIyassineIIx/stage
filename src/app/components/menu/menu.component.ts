import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AccountsService } from '../../services/accounts.service';
import { ConnexionService } from '../../services/connexion.service';
import { Carlist } from '../../class/carlist';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{
accountdetail() {
throw new Error('Method not implemented.');
}
refresh() {
this.cars2=[]
}
  
  aurhservice=inject(AccountsService);
  carlist=inject(ConnexionService);
  cars1:Carlist[]=[]
  cars2:Carlist[]=[]
  router=inject(Router);
  ngOnInit(): void {
    this.carlist.getcars().subscribe(x=>this.cars1=x)
  }
  logout(){
    
    this.aurhservice.logout();
    this.router.navigateByUrl("/");
  }
  onclick(z:HTMLInputElement){

    this.cars2=this.cars1.filter(x=>x.brand==z.value)
    
  }
}
