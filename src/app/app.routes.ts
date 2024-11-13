import { Routes } from '@angular/router';
import { ingresoGuard } from './guards/ingreso-guard.service';
import { inicioGuard } from './guards/inicio-guard.service';
import { misDatosGuard } from './guards/mis-datos.guard';

export const routes: Routes = [ 
  {
    path: '',
    redirectTo: 'ingreso',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage),
    canActivate: [ingresoGuard]
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage),
    canActivate: [inicioGuard]
  },
  {
    path: 'theme',
    loadComponent: () => import('./pages/theme/theme.page').then( m => m.ThemePage)
  },
  {
    path: 'mis-datos',
    loadComponent: () => import('./pages/mis-datos/mis-datos.page').then( m => m.MisDatosPage),
    canActivate: [misDatosGuard]
  },
  {
    path: 'ingreso',
    loadComponent: () => import('./pages/ingreso/ingreso.page').then( m => m.IngresoPage)
  },
  {
    path: 'correo',
    loadComponent: () => import('./pages/correo/correo.page').then( m => m.CorreoPage)
  },
  {
    path: 'pregunta',
    loadComponent: () => import('./pages/pregunta/pregunta.page').then( m => m.PreguntaPage)
  },
  {
    path: 'correcto',
    loadComponent: () => import('./pages/correcto/correcto.page').then( m => m.CorrectoPage)
  },
  {
    path: 'incorrecto',
    loadComponent: () => import('./pages/incorrecto/incorrecto.page').then( m => m.IncorrectoPage)
  },
  {
    path: 'inicio',
    loadComponent: () => import('./pages/inicio/inicio.page').then( m => m.InicioPage),
    canActivate: [inicioGuard]
  },
];
