import { Component,Input,OnChanges, SimpleChanges, OnInit } from '@angular/core';

@Component({
    selector: 'app-food',
    template: '<span class="food-alert"><i class="food-ico {{icons[foodData.product]}}"></i> {{foodData.product}} <span>{{foodData.quantity}} unidades</span></span>',
    styleUrls: ['./app.food.css']
})
export class Appfood{

    @Input() foodData: any;
    iconClass:string;
    icons = {
        "Vaca":"steak",
        "Tocino":"bacon"
    };

}   
  