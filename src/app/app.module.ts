import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppHeader } from './header/app.header';
import {ChartDirective} from './charts/chart.directive';


@NgModule({
  declarations: [
    AppComponent,
    AppHeader,
    //directives
    ChartDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
