import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ConnexionService } from '../../services/connexion.service';
import { Carlist } from '../../class/carlist';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountsService } from '../../services/accounts.service';

@Component({
  selector: 'app-bid',
  standalone: true,
  imports: [],
  templateUrl: './bid.component.html',
  styleUrl: './bid.component.css'
})
export class BidComponent {

  carlist = inject(ConnexionService)
  car!: Carlist;
  router1 = inject(Router)
  router: ActivatedRoute = inject(ActivatedRoute)
  @ViewChild('slider') slider!: ElementRef;
  @ViewChild('progressCircle') progressCircle!: ElementRef;
  currentPosition: number = 0;
  radius = 50;
  circumference = 2 * Math.PI * this.radius;
  progress = 95;
  counter: number = 30;
  aurhservice = inject(AccountsService);
  id!:string;

  ngOnInit(): void {
    this.carlist.getcars().subscribe(carl => {
      this.id=carl.filter(x => x.id == this.router.snapshot.params['id'])[0].uid
      this.car = carl.filter(x => x.id == this.router.snapshot.params['id'])[0]
    })
    this.startProgressAnimation();
  }




  setProgress(percent: number): void {
    if (!this.progressCircle) return;
    const offset = this.circumference - (percent / 100) * this.circumference;
    this.progressCircle.nativeElement.style.strokeDashoffset = offset.toString();
  }

  startProgressAnimation(): void {
    setInterval(() => {
      this.setProgress(this.progress);
      this.progress--;

      if (this.progress < 0) {
        this.progress = 95;
      }
    }, 303);
    setInterval(() => {
      this.counter--;
      if (this.counter < 0) {
        this.counter = 30;
      }
    }, 1000);
  }
  bid() {
    this.car.holder=this.aurhservice.currentUserSig()?.UID as string;
    this.car.currentBid=String(Number(this.car.currentBid)+500)
     this.carlist.updateCar(this.id,this.car).subscribe(x=>console.log(x))
  }
}


