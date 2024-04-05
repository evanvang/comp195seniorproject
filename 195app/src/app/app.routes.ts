import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './Index';
import { AboutComponent } from './About';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { NgModule } from '@angular/core';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';

export const routes: Routes = [
    {path: '', component: IndexComponent},
    {path: 'about', component: AboutComponent},
    {path: 'register', component: SignUpComponent},
    {path: 'login', component: SignInComponent},
    {path: 'profile', component: MyProfileComponent}
];

/*@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}*/