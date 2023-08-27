import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../angular-material.module';
import { AlertComponent } from './components/alert/alert.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { BlankComponent } from './components/blank/blank.component';

@NgModule({
  declarations: [
    AlertComponent,
    SpinnerComponent,
    BlankComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule,
  ], exports: [
    AlertComponent,
    SpinnerComponent
  ]
})
export class SharedModule { }
