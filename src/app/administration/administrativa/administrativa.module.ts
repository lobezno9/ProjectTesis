import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ADMINISTRATIVA_ROUTES } from './administrativa.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountListComponent } from './count-list/count-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CreateCountComponent } from './count-list/create-count/create-count.component'; // <-- import the module
import { CountInventoryComponent } from './count-inventory/count-inventory.component';
import { NgxBarCodePutModule } from 'ngx-barcodeput';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CountListComponent,
    CreateCountComponent,
    CountInventoryComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    AngularMaterialModule,
    NgxBarCodePutModule,

    ADMINISTRATIVA_ROUTES
  ]
})
export class AdministrativaModule { }
