import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { AnimationsExerciseComponent } from './animations-exercise/animations-exercise.component';
import { InterseptorsExerciseComponent } from './interseptors-exercise/interseptors-exercise.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    ReactiveFormComponent,
    AnimationsExerciseComponent,
    InterseptorsExerciseComponent
  ],
  imports: [
    BrowserModule,
    // Forms
    FormsModule,
    ReactiveFormsModule,
    // animations and interceptors exersice
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
