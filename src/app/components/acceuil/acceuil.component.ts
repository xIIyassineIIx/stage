import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ConnexionService } from '../../services/connexion.service';
import { Carlist } from '../../class/carlist';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-acceuil',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.css'
})
export class AcceuilComponent {

  @ViewChild('slider') slider!: ElementRef;
  currentPosition: number = 0; 
  carlist=inject(ConnexionService)
  tab:Carlist[]=[]
  router=inject(Router);
  ngOnInit(): void {
    this.carlist.getcars().subscribe(car=>this.tab=car)
  }
  moveSlider(delta: number) {
    
    if((this.currentPosition+ delta<=0 && this.currentPosition+delta>=-50)){
      this.currentPosition += delta;
    }
    if (this.slider) {
      this.slider.nativeElement.style.transform = `translateX(${this.currentPosition}%)`;
    }
  }

  right() {
    this.moveSlider(-50); 
  }

  left() {
    this.moveSlider(50); 
  }
  cardetails(val:number) {
    this.router.navigate(['/cardetails',val])
  }
}

  

