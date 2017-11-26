import { Component, OnInit } from '@angular/core';

import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  templateUrl: './app.dashboard.html',
  styleUrls: ['./app.dashboard.css']
})
export class AppDashboard implements OnInit{
  title = 'Dashboard Principal';

  tLogObservable:Observable<any[]>;

  deliveries:Array<any>;

  constructor(
    private afDb: AngularFireDatabase,
    private route: ActivatedRoute,
    private router: Router){
    //afDb.list<any>('test').push({ value1: 24, value2: 25 });
        
    }

    ngOnInit() {
        this.afDb.list<any>('Delivery', ref=>ref.orderByChild("is_active").equalTo(true))
        .snapshotChanges().map(action => {
            
            let paylo = JSON.parse(JSON.stringify(Object.assign({},action)));

            let objArray = Object.keys(paylo).map((k) => paylo[k]);

            return objArray.map(ob=>{
                return Object.assign({},{key:ob.key},ob.payload);
            });

          }).subscribe(d=>{
              console.log(d);
            this.deliveries = d;
        })
    }

  getTest(listPath): Observable<any[]> {
    return this.afDb.list<any>(listPath).valueChanges();
  }
}
