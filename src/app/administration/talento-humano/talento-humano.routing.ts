import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const TalentoHumanoRoutes: Routes =
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


export const TALENTO_HUMANO_ROUTES = RouterModule.forChild(TalentoHumanoRoutes);
