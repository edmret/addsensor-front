import { Component, OnInit, NgZone } from '@angular/core';

import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

interface Delivery{
    boxes:Array<any>,
    destination:any,
    origin:any,
    is_active:any
};

@Component({
  templateUrl: './app.dashboard.html',
  styleUrls: ['./app.dashboard.css']
})
export class AppDashboard implements OnInit{
  title = 'Dashboard Principal';

  tLogObservable:Observable<any[]>;

  deliveries:Array<any>;

  currentSensor = {};

  currentBox:any = {
        products: []
    };

  constructor(
    private afDb: AngularFireDatabase,
    private route: ActivatedRoute,
    private _ngZone: NgZone,
    private router: Router){
    //afDb.list<any>('test').push({ value1: 24, value2: 25 });
        
    }

    ngOnInit() {
        this.afDb.list<any>('Delivery', ref=>ref.orderByChild("is_active").equalTo(true))
        .snapshotChanges().map(action => {
            
            let paylo = JSON.parse(JSON.stringify(Object.assign({},action)));

            let objArray = Object.keys(paylo).map((k) => paylo[k]);


            return objArray.map(ob=>{
                return Object.assign({},{ theSensor:{}, truck: {} },{key:ob.key},ob.payload);
            });

          }).subscribe(d=>{
            console.log(d);

            this.deliveries = d;
            this.deliveries.forEach(d=>{
                this.getSensor(d);
            })
        })
    }

    

    getLogs(deliver){
        this.afDb.list<any>('tlog', ref=>ref.orderByChild("deliveryId").equalTo(deliver.key || "0")).valueChanges().subscribe(log=>{
            let humy = log.map(l=>l.humidity);
            let temp = log.map(l=>l.temperature);
            let timestamp = log.map(l=>l.timestamp);
      
      
            let minHumidity = Math.min(...(humy || []) );
            let maxHumidity = Math.max(...(humy || []));
    
            let minTemperature = Math.min(...(temp || []) );
            let maxTemperature = Math.max(...(temp || []));
      
      
      
            let sendArray = [humy.slice(-20) , temp.slice(-20), timestamp.slice(-20)];
      
            let chartData = sendArray;
    
            let currentTemperature = (chartData[1] || [0]).slice(-1);
            let prodsObj = deliver.boxes[0].products;

            let productsArray = Object.keys(prodsObj).map(k=>prodsObj[k]);

            deliver.productsArray = productsArray;

            productsArray.forEach(p=>{
                this.getProducts(p.productId, minTemperature, maxTemperature, deliver);
            });


      
            this.setCssClass(deliver);
    
          });
    }

    setCssClass(deliver){
        let warns = (deliver.productsArray || []).filter(p=>p.isWarning);
        let dangers = (deliver.productsArray || []).filter(p=>p.isDanger);
     

        

        this._ngZone.runOutsideAngular(() => {

            this._ngZone.run(() => {
                if(dangers.length > 0){
                    deliver.cssClass = "bad";
                }else if(warns.length > 0){
                    deliver.cssClass = "warn";
                }else{
                    deliver.cssClass = "good";
                }
             });
        });


        console.log("cssClass", deliver.cssClass);
        



    }

    getProducts (productId, minTemperature, maxTemperature,  deliver) {

            this.afDb.object('products/'+productId
            
        ).valueChanges().subscribe(prod=>{
            var ref = deliver.productsArray.find(p=>p.productId == productId);
            ref = Object.assign(ref,prod);
            ref.isWarning = minTemperature < ref.min || minTemperature > ref.max
                || maxTemperature < ref.min || maxTemperature > ref.max;
            ref.isDanger = maxTemperature >= 23 || minTemperature >= 23;
            this.setCssClass(deliver);
        });
    }

    getTruck(deliver){
        this.afDb.object('boxes/' + deliver.theSensor.box_id
        
        ).valueChanges().subscribe(truck=>{
            deliver.truck = truck;
            this.getLogs(deliver);
        });
    }

    getSensor(deliver){
        this.afDb.object('AddSensor/' + deliver.boxes[0].sensor
        
        ).valueChanges().subscribe(sensor=>{
            deliver.theSensor = sensor;
            this.getTruck(deliver);
        });
    }

    getTest(listPath): Observable<any[]> {
        return this.afDb.list<any>(listPath).valueChanges();
    }
}
