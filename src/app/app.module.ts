import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';


import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';

import { MaterialModule } from './material.module';
import {MatNativeDateModule} from '@angular/material/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgSelectModule } from '@ng-select/ng-select';
import { TacheComponent } from './tache/tache.component';
import { DialogTacheComponent } from './components/dialog-tache/dialog-tache.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
   
    TacheComponent,
    DialogTacheComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    //MatSliderModule,

    MatNativeDateModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgSelectModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
