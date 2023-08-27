import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const VerticalSaludAsiRoutes: Routes =
  [
    {
      path: '',
      children: [
        {
          path: '',
          // component: ,
          data: {
            title: '',
            urls: [{ title: '', url: '/' }, { title: '' }]
          }
        },


      ]
    }
  ];


export const VERTICAL_SALUD_ASI_ROUTES = RouterModule.forChild(VerticalSaludAsiRoutes);
