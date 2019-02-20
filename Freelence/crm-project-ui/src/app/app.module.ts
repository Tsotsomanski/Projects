import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClientsComponent } from './clients/clients.component';
import { TasksComponent } from './tasks/tasks.component';
import { DetailsComponent } from './details/details.component';
import { CreateButtonComponent } from './common/create-button/create-button.component';

@NgModule({
  declarations: [
      AppComponent,
      ClientsComponent,
      TasksComponent,
      DetailsComponent,
      CreateButtonComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
