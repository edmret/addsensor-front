import { Directive, ViewContainerRef, ElementRef, AfterViewInit, HostListener, Input, OnChanges  } from '@angular/core';
import * as Chart from 'chart.js'
import { element } from 'protractor';
import * as moment from 'moment';

import './charts.css';

@Directive({
  selector: '[chartDirective]',
})
export class ChartDirective  implements AfterViewInit, OnChanges {

  canvas: any;
  ctx: any;
  titleHumidity = 'Monitor de Humedad';
  titleTemperature =  'Monitor de Temperatura';

  @Input() ChartData: Array<Array<number>>;

  constructor(el: ElementRef) {
      this.canvas = el.nativeElement;
  }

  makeGraph(animated = true){
    let values = [...this.ChartData[2]].map(v=>moment(v).format('LTS'));
    let humidity = this.getDataSets(this.ChartData[0], 'rgba(99, 132, 255, 1)' , this.titleHumidity);
    let temperature = this.getDataSets(this.ChartData[1], 'rgba(255, 99, 132, 1)', this.titleTemperature);


    this.ctx = this.canvas.getContext('2d');
    let myChart = new Chart(this.ctx, {
      type: 'line',
      data: {
          labels: values,
          datasets: [temperature, humidity]
      },
      options: {
        responsive: false,
        animation: false
      }
    });
  }

  ngOnChanges(changes){
    this.makeGraph(false);
  }
  
  getDataSets(data, color,title, hidden = false){
    return {
        label: title,
        data: data,
        backgroundColor: data.map(d=>color),
        borderWidth: 1,
        hidden: hidden
    };
  }

  ngAfterViewInit() {
    this.makeGraph();
    
  }
}