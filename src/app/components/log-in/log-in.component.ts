import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import {FormControl,FormGroup,Validators, FormBuilder,ReactiveFormsModule} from '@angular/forms'
import { AccountsService } from '../../services/accounts.service';
import { Router } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ReactiveFormsModule,UpperCasePipe],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  fb=inject(FormBuilder);
  router=inject(Router)
  authservice=inject(AccountsService)
  errormassage!: String | null;
  username:string="";

  formlogin = this.fb.nonNullable.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]] 
  });
  
  

  onsubmit11(){
    this.router.navigateByUrl("/");
  }
  onsubmit2(){
    let rawform=this.formlogin.getRawValue();
    this.authservice.login(rawform.email,rawform.password).subscribe(
      {
        next:()=>{
          this.router.navigateByUrl("/");
        },
        error:(err)=>{
          this.errormassage=err.code;
        }
      }
    )

  }
  logout(){
    this.authservice.logout();
  }


}
