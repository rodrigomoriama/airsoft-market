import { PublicationDetailComponent } from './publication-detail/publication-detail.component';
import { MosaicComponent } from './mosaic/mosaic.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [

    { path: 'publication-detail/:id', component: PublicationDetailComponent },

    { path: 'home', component: MosaicComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: HomeComponent },

];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
