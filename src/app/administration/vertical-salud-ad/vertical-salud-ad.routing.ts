import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const VerticalSaludAdRoutes: Routes =
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


export const VERTICAL_SALUD_AD_ROUTES = RouterModule.forChild(VerticalSaludAdRoutes);
