import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const FinancieraRoutes: Routes =
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


export const FINANCIERA_ROUTES = RouterModule.forChild(FinancieraRoutes);
