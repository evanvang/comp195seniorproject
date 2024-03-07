import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './Index';
import { AboutComponent } from './About';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {path: '', component: IndexComponent},
    {path: 'about', component: AboutComponent},
    {path: 'myprofile', component: MyProfileComponent}
];

/*@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}*/