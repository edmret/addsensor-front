import { Directive, ViewContainerRef, ElementRef, AfterViewInit, HostListener, Input   } from '@angular/core';
import * as Chart from 'chart.js'
import { element } from 'protractor';

import './charts.css';

@Directive({
  selector: '[chartDirective]',
})
export class ChartDirective  implements AfterViewInit{

  canvas: any;
  ctx: any;
  title = 'Monitor de Humedad';

  @Input() ChartData: Array<number>;

  constructor(el: ElementRef) {
      this.canvas = el.nativeElement;
  }

  

  ngAfterViewInit() {
    
    let values = [...this.ChartData];


    this.ctx = this.canvas.getContext('2d');
    let myChart = new Chart(this.ctx, {
      type: 'line',
      data: {
          labels: values,
          datasets: [{
              label: this.title,
              data: values,
              backgroundColor: values.map(d=>'rgba(255, 99, 132, 1)'),
              borderWidth: 1
          }]
      },
      options: {
        responsive: false,
        display:true
      }
    });
  }
}