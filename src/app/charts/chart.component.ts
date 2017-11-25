import { Component, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';


@Component({
  selector: 'app-my-chart',
  template: ''
})
export class AppMyChart implements AfterViewInit {

  @ViewChild('someVar') el:ElementRef;
  
  constructor(private rd: Renderer2) {}

  ngAfterViewInit() {
    console.log(this.rd);
    console.log(this.el.nativeElement);
  }
}
