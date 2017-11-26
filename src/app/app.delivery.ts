import { Component, OnInit } from '@angular/core';

import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

interface Delivery{
    boxes:Array<any>,
    destination:any,
    origin:any,
    is_active:any
}

@Component({
    templateUrl: './app.delivery.html',
    styleUrls: ['./app.delivery.css']
  })
  export class AppDelivery implements OnInit{
    title = 'Resumen';
  
    tLogObservable:Observable<any[]>;
  
    minTemperature: number;
    maxTemperature: number;
  
    minHumidity: number;
    maxHumidity: number;


    id:any;
    idSensor: any;
  
    chartData = [ [], [] ];

    currentTemperature:any = 0;

    currentBox:any = {
        products: []
    };
  
    ngOnInit() {
      this.tLogObservable = this.getTest('/tlog');

      this.route.params.subscribe(params => {
        this.id = params.id;
        this.idSensor = params.sensor;
        this.getBoxDetail(params.id, params.sensor);

        this.afDb.list<any>('tlog', ref=>ref.orderByChild("deliveryId").equalTo(this.id || "0")).valueChanges().subscribe(log=>{
            let humy = log.map(l=>l.humidity);
            let temp = log.map(l=>l.temperature);
      
      
            this.minHumidity = Math.min(...(humy || []) );
            this.maxHumidity = Math.max(...(humy || []));
    
            this.minTemperature = Math.min(...(temp || []) );
            this.maxTemperature = Math.max(...(temp || []));
      
      
      
            let sendArray = [humy , temp];
      
            this.chartData = sendArray;
    
            this.currentTemperature = (this.chartData[1] || [0]).slice(-1);
    
            this.currentBox.products = this.currentBox.products.map(p=>{
                p.isWarning = this.currentTemperature < p.min || this.currentTemperature > p.max;
                return p;
            });
      
            /*this._ngZone.runOutsideAngular(() => {
              this.chartData = sendArray;
      
              this._ngZone.run(() => {console.log('Outside Done!') });
            });*/
      
    
          });


      });

      
    }
  
    constructor(
        private afDb: AngularFireDatabase,
        private route: ActivatedRoute,
        private router: Router){
      //afDb.list<any>('test').push({ value1: 24, value2: 25 });
      
    }

    getProducts (productId) {
            this.afDb.object('products/'+productId
            
        ).valueChanges().subscribe(prod=>{
            var ref = this.currentBox.products.find(p=>p.productId == productId);
            ref = Object.assign(ref,prod);
            ref.isWarning = this.currentTemperature < ref.min || this.currentTemperature > ref.max;
            console.log(this.currentBox);
        });
    }

    getBoxDetail(id,sensor){
        this.afDb.object('Delivery/'+id
        ).valueChanges().subscribe((del:Delivery)=>{
            console.log(del);
            this.currentBox = (del || {boxes:[]}).boxes.find(x=>x.sensor==sensor);

            this.currentBox.products.forEach(element => {
                this.getProducts(element.productId);
            });
            
            console.log(this.currentBox);
        });
    }

  
    getTest(listPath): Observable<any[]> {
      return this.afDb.list<any>(listPath).valueChanges();
    }
  
  }