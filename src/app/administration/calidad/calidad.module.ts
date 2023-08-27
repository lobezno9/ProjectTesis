import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CALIDAD_ROUTES } from './calidad.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,


    CALIDAD_ROUTES
  ]
})
export class CalidadModule { }
