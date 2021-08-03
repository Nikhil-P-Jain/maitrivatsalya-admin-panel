import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicLoginComponent } from './basic-login.component';
import {BasicLoginRoutingModule} from './basic-login-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import { CookieService } from 'ngx-cookie-service'; 

@NgModule({
  imports: [
    CommonModule,
    BasicLoginRoutingModule,
    SharedModule,
  ],
  declarations: [BasicLoginComponent],
  providers: [CookieService],
})
export class BasicLoginModule { }
