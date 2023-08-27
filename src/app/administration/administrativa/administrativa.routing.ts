import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountInventoryComponent } from './count-inventory/count-inventory.component';
import { CountListComponent } from './count-list/count-list.component';

const AdministrativaRoutes: Routes =
  [
    {
      path: '',
      children: [
        {
          path: 'ListCounts',
          component: CountListComponent,
          data: {
            title: 'ListCounts',
            urls: [{ title: 'ListCounts', url: '/ListCounts' }, { title: 'ListCounts' }]
          }
        },
        {
          path: 'CountInvantory/:id/:Detail',
          component: CountInventoryComponent,
          data: {
            title: 'CountInvantory',
            urls: [{ title: 'CountInvantory', url: '/CountInvantory' }, { title: 'CountInvantory' }]
          }
        },


      ]
    }
  ];


export const ADMINISTRATIVA_ROUTES = RouterModule.forChild(AdministrativaRoutes);