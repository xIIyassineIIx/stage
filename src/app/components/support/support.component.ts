import { Component, ElementRef, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { ConnexionService } from '../../services/connexion.service';
import { Message } from '../../class/message';
import { AccountsService } from '../../services/accounts.service';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [],
  templateUrl: './support.component.html',
  styleUrl: './support.component.css'
})
export class SupportComponent implements OnInit {
  messageservice=inject(ConnexionService);
  chat:any[]=[];
  id:string=""
  idsender:string=""
  idrecever:string=""
   @ViewChild('slider') chatContainer!: ElementRef;
   authservice=inject(AccountsService)
  ngOnInit(): void {
    this.messageservice.getconversation().subscribe(t=>{
      if(t.filter(x=>x.idSender==this.authservice.currentUserSig()?.UID)[0]!=null){
        this.id=t.filter(x=>x.idSender==this.authservice.currentUserSig()?.UID)[0].id;
        this.idsender=t.filter(x=>x.idSender==this.authservice.currentUserSig()?.UID)[0].idSender;
        this.idrecever=t.filter(x=>x.idSender==this.authservice.currentUserSig()?.UID)[0].idResever;
        this.chat=t.filter(x=>x.idSender==this.authservice.currentUserSig()?.UID)[0].message.map(z=>JSON.parse(z));
      }
      
    }) 
    
  }
  onclick(val: HTMLInputElement) {
    this.chat.push({"sender":this.authservice.currentUserSig()?.UID,"message":`${val.value}`})
    if(this.id!=""){
      let updateddata={
            "idResever":"2",
            "idSender":this.idsender,
            "message":this.chat.map((x:any)=>JSON.stringify(x))
          }
          this.messageservice.updateconversation(this.id,updateddata)
    }else{
      let datainsert={
        "idResever":"2",
        "idSender":this.authservice.currentUserSig()?.UID,
        "message":this.chat.map((x:any)=>JSON.stringify(x))
      }
      this.messageservice.addconversation(datainsert);
    }
    
    this.scrollToBottom()
  }
  scrollToBottom() {
    this.chatContainer.nativeElement.scrollTop = (this.chatContainer.nativeElement.scrollHeight+100);
  }
}
