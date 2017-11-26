import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './app.header.html',
  styleUrls: ['./app.header.css']
})
export class AppHeader implements OnInit{
  title = 'The header';

  id:any;

  constructor(private route:ActivatedRoute){
    
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = params.id;
    });

  }
}
