import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AppDelivery} from "./app.delivery";


import { AppComponent } from './app.component';
import { AppHeader } from './header/app.header';
import {Appfood} from './app.food';
import {ChartDirective} from './charts/chart.directive';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {firebaseConfig} from './config/firebase';
import { RouterModule, Routes } from '@angular/router';
import {ParamsServiceService} from './params-service.service';
import {AppDashboard} from './app.dashboard';

const appRoutes: Routes = [
  { path: 'delivery/:id', component: AppDelivery },
  { path: '', component: AppDashboard }
];


@NgModule({
  declarations: [
    AppComponent,
    AppHeader,
    AppDelivery,
    Appfood,
    ChartDirective,
    AppDashboard
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot(
      appRoutes,
      { useHash: true } // <-- debugging purposes only
    )
  ],
  providers: [
    ParamsServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
