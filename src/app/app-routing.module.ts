import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { LoginComponent } from './paginas/login/login.component';
import { PrivadoComponent } from './paginas/privado/privado.component';


const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'privado', component: PrivadoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const RUTAS = [
  {
    "enlace": "/",
    "nombre": "Inicio"
  },
  {
    "enlace": "login",
    "nombre": "Login"
  },
  {
    "enlace": "privado",
    "nombre": "Privado"
  }
];
