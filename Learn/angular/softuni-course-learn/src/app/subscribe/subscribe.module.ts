 import {NgModule} from '@angular/core';
import { CommonModule } from '../../../node_modules/@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SubscribeComponent } from './subscribe.component';
import { AboutComponent } from './about.component';

 @NgModule({
     declarations: [
        SubscribeComponent,      
        AboutComponent
    ],
     imports: [
         CommonModule,
         HttpClientModule
     ]
 })

 export class SubscribeModule {

 }