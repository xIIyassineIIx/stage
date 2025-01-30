import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { AccountsService } from '../../services/accounts.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
    fb=inject(FormBuilder);
    router=inject(Router)
    authservice=inject(AccountsService)
     @ViewChild('progress') progress!: ElementRef;
     @ViewChild('step1') step1!: ElementRef;
     @ViewChild('step2') step2!: ElementRef;
     @ViewChild('num') num!: ElementRef;
    errormassage!: String | null;
    username:string="";
    formregister= this.fb.nonNullable.group({
      email : ["",Validators.required,Validators.email],
      username : ["",Validators.required],
      password : ["",Validators.required],
      accepted : [false]
    })
    formlogin= this.fb.nonNullable.group({
      email : ["",Validators.required,Validators.email],
      password : ["",Validators.required]
    })
    onsubmit1(){
      let rawform=this.formregister.getRawValue();
      this.authservice.register(rawform.email,rawform.username,rawform.password).subscribe(
        {
          next:()=>{
            this.progress.nativeElement.style.width="100%";
            this.num.nativeElement.innerHTML="2";
            this.step1.nativeElement.hidden=true;
            this.step2.nativeElement.hidden=false;
            this.username=rawform.username;
          },
          error:(err)=>{
            this.errormassage=err.code;
          }
        }
      )
  
    }
  
    onsubmit11(){
      this.router.navigateByUrl("/");
    }


  
}
