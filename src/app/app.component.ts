import { Component, OnInit, NgZone } from '@angular/core';

import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Entrega';

  tLogObservable:Observable<any[]>;

  chartData = [
    [1,5,3,40,9,15,26,38],
    [64,53,36,25,9,15,26,38]
  ];

  ngOnInit() {
    this.tLogObservable = this.getTest('/tlog');
  }

  constructor(private afDb: AngularFireDatabase, private _ngZone: NgZone){
    //afDb.list<any>('test').push({ value1: 24, value2: 25 });
    afDb.list<any>('tlog').valueChanges().subscribe(log=>{
      let humy = log.map(l=>l.humidity);
      let temp = log.map(l=>l.temperature);

      let sendArray = [humy , temp];

      

      this._ngZone.runOutsideAngular(() => {
        this.chartData = sendArray;
        this._ngZone.run(() => {console.log('Outside Done!') });
      });

      console.log(sendArray);
    });
  }

  getTest(listPath): Observable<any[]> {
    return this.afDb.list<any>(listPath).valueChanges();
  }

}
