import { PageSuccessPublicationComponent } from './pages/page-success-publication/page-success-publication.component';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PublicationComponent } from './publication/publication.component';
import { PublicationDetailComponent } from './publication-detail/publication-detail.component';
import { MosaicComponent } from './mosaic/mosaic.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [

    { path: 'profile', component: ProfileComponent , children: [
        { path: 'edit', component: EditProfileComponent },
        { path: 'change-password', component: ChangePasswordComponent },
    ]},

    { path: 'new-publication', component: PublicationComponent },
    { path: 'new-publication/:id', component: PublicationComponent },

    { path: 'publication-detail/:id', component: PublicationDetailComponent },

    { path: 'success-publication/:id', component: PageSuccessPublicationComponent },

    { path: 'login', component: LoginComponent },

    { path: 'home', component: MosaicComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent },

];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
