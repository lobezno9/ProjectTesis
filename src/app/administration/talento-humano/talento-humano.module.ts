import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TALENTO_HUMANO_ROUTES } from './talento-humano.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,

    TALENTO_HUMANO_ROUTES
  ]
})
export class TalentoHumanoModule { }
