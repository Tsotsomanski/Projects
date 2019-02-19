import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClientsComponent } from './clients/clients.component';
import { TasksComponent } from './tasks/tasks.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [
      AppComponent,
      ClientsComponent,
      TasksComponent,
      DetailsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
