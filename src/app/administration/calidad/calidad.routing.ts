import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const CalidadRoutes: Routes =
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


export const CALIDAD_ROUTES = RouterModule.forChild(CalidadRoutes);
