import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VERTICAL_SALUD_ASI_ROUTES } from './vertical-salud-asi.routing';
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


    VERTICAL_SALUD_ASI_ROUTES
  ]
})
export class VerticalSaludAsiModule { }
