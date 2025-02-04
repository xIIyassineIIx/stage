import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ConnexionService } from '../../services/connexion.service';
import { Carlist } from '../../class/carlist';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountsService } from '../../services/accounts.service';
import { Bid } from '../../class/bid';
import { BidService } from '../../services/bid.service';

@Component({
  selector: 'app-bid',
  standalone: true,
  imports: [],
  templateUrl: './bid.component.html',
  styleUrl: './bid.component.css'
})
export class BidComponent {

  carlist = inject(ConnexionService)
  router1 = inject(Router)
  aurhservice = inject(AccountsService);
  bidservice = inject(BidService);
  car!: Carlist;
  biding!:Bid;
  id!: string;
  holder:string=""

  router: ActivatedRoute = inject(ActivatedRoute)
  @ViewChild('slider') slider!: ElementRef;
  @ViewChild('progressCircle') progressCircle!: ElementRef;
  @ViewChild('timer') timer!: ElementRef;

  currentPosition: number = 0;
  radius = 50;
  circumference = 2 * Math.PI * this.radius;
  progress = 100;
  counter: number = 30;
  

  ngOnInit(): void {
    this.carlist.getcars().subscribe(carl => {
      this.id = carl.filter(x => x.id == this.router.snapshot.params['id'])[0].uid
      this.car = carl.filter(x => x.id == this.router.snapshot.params['id'])[0]
      

    })
    this.bidservice.getBid().subscribe(bidlist=>{
      console.log(bidlist.filter(x=>x.carId=this.id)[0])
      this.biding=bidlist.filter(x=>x.carId=this.id)[0];
    })

    let timerIntervalId=window.setInterval(() => {
      let date = new Date();
      let date_depot = new Date(this.car.date)
      let date1 = new Date(date_depot.setDate(date_depot.getDate() + 15))
      date_depot.setDate(date_depot.getDate() - 15)
      if (date < date1) {
        this.timer.nativeElement.hidden = true;
      } else {
        this.timer.nativeElement.hidden = false;
        this.startProgressAnimation()
        window.clearInterval(timerIntervalId);
      }
    }, 0);
    
   

      
  }




  setProgress(percent: number): void {
    if (!this.progressCircle) return;
    const offset = this.circumference - (percent / 100) * this.circumference;
    this.progressCircle.nativeElement.style.strokeDashoffset = offset.toString();
  }

  startProgressAnimation(): void {
    let progressIntervalId: number;
    let counterIntervalId: number;
    this.progress = 100;
    this.counter = Math.ceil((this.progress * 300) / 1000);
    progressIntervalId = window.setInterval(() => {

      this.setProgress(this.progress);
      if (this.progress <= 0 ) {
        window.clearInterval(progressIntervalId);
        window.clearInterval(counterIntervalId);
        return;
      }
      this.progress--;
    }, 297);
    counterIntervalId = window.setInterval(() => {
      if (this.counter <= 0 ) {
        window.clearInterval(counterIntervalId);
        window.clearInterval(progressIntervalId);
        return;
      }
      this.counter--;
    }, 1000);
  }
  bid() {
    this.biding.pholder = this.biding.pholder;
    this.biding.holder = this.aurhservice.currentUserSig()?.UID as string;
    this.car.currentBid = String(Number(this.car.currentBid) + 500)
    this.carlist.updateCar(this.id, this.car)
    this.bidservice.updateBid(this.id, this.biding)
  }
}


