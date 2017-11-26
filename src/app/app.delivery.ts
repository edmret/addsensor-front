import { Component, OnInit } from '@angular/core';

import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
    templateUrl: './app.delivery.html',
    styleUrls: ['./app.delivery.css']
  })
  export class AppDelivery implements OnInit{
    title = 'Entrega';
  
    tLogObservable:Observable<any[]>;
  
    minTemperature: number;
    maxTemperature: number;
  
    minHumidity: number;
    maxHumidity: number;


    id:any;
  
    chartData = [ [], [] ];
  
    ngOnInit() {
      this.tLogObservable = this.getTest('/tlog');

      this.route.params.subscribe(params => {
        this.id = params.id;
      });

    }
  
    constructor(
        private afDb: AngularFireDatabase,
        private route: ActivatedRoute,
        private router: Router){
      //afDb.list<any>('test').push({ value1: 24, value2: 25 });
      afDb.list<any>('tlog').valueChanges().subscribe(log=>{
        let humy = log.map(l=>l.humidity);
        let temp = log.map(l=>l.temperature);
  
  
        this.minHumidity = Math.min(...(humy || []) );
        this.maxHumidity = Math.max(...(humy || []));
  
  
  
        let sendArray = [humy , temp];
  
        this.chartData = sendArray;
  
        /*this._ngZone.runOutsideAngular(() => {
          this.chartData = sendArray;
  
          this._ngZone.run(() => {console.log('Outside Done!') });
        });*/
  
        console.log(sendArray);
      });
    }
  
    getTest(listPath): Observable<any[]> {
      return this.afDb.list<any>(listPath).valueChanges();
    }
  
  }