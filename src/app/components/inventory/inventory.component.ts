import { Component, inject, OnInit } from '@angular/core';
import { ConnexionService } from '../../services/connexion.service';
import { Carlist } from '../../class/carlist';
import { RemainTimePipe } from '../../pipe/remain-time.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [RemainTimePipe],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent implements OnInit {



  carlist=inject(ConnexionService)
  tab:Carlist[]=[]
  tab_reserve:Carlist[]=[]
  tab_condition:string[]=[]
  tab_location:string[]=[]
  tab_brand:string[]=[]
  tab_type:string[]=[]
  tab_transmission:string[]=[]
  filtrage:string[]=[]
  router:Router=inject(Router)
  
  
  
  
  ngOnInit(): void {
    this.carlist.getcars().subscribe(car=>{
      this.tab=car
      this.tab_reserve=car
      this.tab_condition=[...new Set(car.map(x=>x.primaryDamage))];
      this.tab_location=[...new Set(car.map(x=>x.location))];
      this.tab_brand=[...new Set(car.map(x=>x.brand))];
      this.tab_transmission=[...new Set(car.map(x=>x.transmission))];
      this.tab_type=[...new Set(car.map(x=>x.type))];
    })
  }

  Onaffiche(elem:HTMLDivElement){
      if(elem.hidden==false){
        elem.hidden=true;
      }
      else{
        elem.hidden=false;
      }
  }
  OnFilter(ev:Event){
    let x=ev.target as HTMLInputElement;
    if(x.checked){
      this.filtrage.push(x.previousElementSibling?.innerHTML as string);
    }
    else{
      this.filtrage=this.filtrage.filter(z=>z!=x.previousElementSibling?.innerHTML as string);
    }
    console.log(this.filtrage)
  }
  OnClick(){
    if(this.filtrage.length!=0){
      this.tab=this.tab.filter(x=>{
        return this.filtrage.some(z=>z==String(x.odometre)) ||
        this.filtrage.some(z=>z==x.primaryDamage)||
        this.filtrage.some(z=>z==x.transmission) ||
        this.filtrage.some(z=>z==x.type) ||
        this.filtrage.some(z=>z==x.location )||
        this.filtrage.some(z=>z==x.model) ||
        this.filtrage.some(z=>z==x.brand)
    })
    }
    else{
      this.tab=this.tab_reserve;
    }
    
  }
  OnReset() {
    this.tab=this.tab_reserve;
    }
  cardetails(val:number) {
    this.router.navigate(['/cardetails',val])
  }
}
