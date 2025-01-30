import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AccountsService } from '../../services/accounts.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  aurhservice=inject(AccountsService);
  router=inject(Router);
  logout(){
    this.aurhservice.logout();
    this.router.navigateByUrl("/");
  }
}
