import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HeaderComponent,
    ModalComponent
  ],
  providers: [

  ],
  exports: [
    HeaderComponent,
    ModalComponent
  ]
})

export class SharedModule {

}
