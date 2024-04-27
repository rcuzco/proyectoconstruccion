import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { PaginasRoutingModule } from './paginas/paginas.routing';
import { AuthRoutingModule } from './auth/auth-routing.module';

const routes: Routes = [

  { path: '', redirectTo: '/portada', pathMatch: 'full' },
  { path: '**', component: NopagefoundComponent },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PaginasRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

