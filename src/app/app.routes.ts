import { Routes } from '@angular/router';
import { AcceuilComponent } from './components/acceuil/acceuil.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { ErrorComponent } from './components/error/error.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { SupportComponent } from './components/support/support.component';
import { BidComponent } from './components/bid/bid.component';
import { guardGuard } from './guard/guard.guard';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [

    {path:"home",title:"home",component:AcceuilComponent},
    {path:"inventory",title:"inventory",component:InventoryComponent},
    {path:"cardetails/:id",title:"inventory",component:CarDetailsComponent},
    {path:"login",title:"login",component:LogInComponent},
    {path:"howItWorks",title:"howItWorks",component:HowItWorksComponent},
    {path:"register",title:"register",component:RegisterComponent},
    {path:"bid/:id",title:"bid",component:BidComponent,canActivate:[guardGuard]},
    {path:"support",title:"support",component:SupportComponent,canActivate:[guardGuard]},
    {path:"espace_utilisateur",title:"espace_utilisateur",component:ProfileComponent,canActivate:[guardGuard]},
    {path:"",redirectTo:"home",pathMatch:"full"},
    {path:"**",title:"error",component:ErrorComponent}
];
