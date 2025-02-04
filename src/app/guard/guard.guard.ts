import { CanActivateFn, Router } from '@angular/router';
import { AccountsService } from '../services/accounts.service';
import { inject } from '@angular/core';

export const guardGuard: CanActivateFn = (route, state) => {
  const router:Router=inject(Router);
  let person=inject(AccountsService)
  if(person.currentUserSig()){
    return true
  }else
    return false;
};
