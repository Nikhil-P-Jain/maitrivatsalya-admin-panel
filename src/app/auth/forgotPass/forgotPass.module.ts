import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPassComponent } from './forgotPass.component';
import {ForgotPassRoutingModule} from './forgotPass-routing.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ForgotPassRoutingModule,
    SharedModule
  ],
  declarations: [ForgotPassComponent]
})
export class ForgotPassModule { }
