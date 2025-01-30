import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ConnexionService } from '../../services/connexion.service';
import { Carlist } from '../../class/carlist';
import { ActivatedRoute, Router } from '@angular/router';
import { RemainTimePipe } from '../../pipe/remain-time.pipe';
import { StartTimePipe } from "../../pipe/start-time.pipe";

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [RemainTimePipe, StartTimePipe],
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.css'
})
export class CarDetailsComponent {
    carlist=inject(ConnexionService)
    car!:Carlist;
    router1=inject(Router)
    router:ActivatedRoute=inject(ActivatedRoute)
    @ViewChild('slider') slider!: ElementRef;
    currentPosition: number = 0; 
    
    
    
    ngOnInit(): void {
      this.carlist.getcars().subscribe(carl=>{
        this.car=carl.filter(x=>x.id==this.router.snapshot.params['id'])[0]
      })
    }
    moveSlider(delta: number) {
    
      if((this.currentPosition+ delta<=0 && this.currentPosition+delta>=-99)){
        this.currentPosition += delta;
      }
      if (this.slider) {
        this.slider.nativeElement.style.transform = `translateX(${this.currentPosition}%)`;
      }
    }
  
    right() {
      this.moveSlider(-34); 
    }
  
    left() {
      this.moveSlider(34); 
    }
    bidnow(val:number) {
      this.router1.navigate(['/bid',val])
    }
}
