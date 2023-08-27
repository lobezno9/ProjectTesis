import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './shared/components/blank/blank.component';


//Definicion de Rutas utilizando Lasy Loading 
const routes: Routes = [
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'Financiera',
        loadChildren: () => import('./administration/financiera/financiera.module').then(m => m.FinancieraModule),
        // canLoad: [AuthenticationGuard],
      },
      {
        path: 'Administrativa',
        loadChildren: () => import('./administration/administrativa/administrativa.module').then(m => m.AdministrativaModule),
        // canLoad: [AuthenticationGuard],
      },
      {
        path: 'TalentoHumano',
        loadChildren: () => import('./administration/talento-humano/talento-humano.module').then(m => m.TalentoHumanoModule),
        // canLoad: [AuthenticationGuard],
      },
      {
        path: 'VerSaludAdm',
        loadChildren: () => import('./administration/vertical-salud-ad/vertical-salud-ad.module').then(m => m.VerticalSaludAdModule),
        // canLoad: [AuthenticationGuard],
      },
      {
        path: 'VerSaludAsi',
        loadChildren: () => import('./administration/vertical-salud-asi/vertical-salud-asi.module').then(m => m.VerticalSaludAsiModule),
        // canLoad: [AuthenticationGuard],
      },
      {
        path: 'Calidad',
        loadChildren: () => import('./administration/calidad/calidad.module').then(m => m.CalidadModule),
        // canLoad: [AuthenticationGuard],
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
