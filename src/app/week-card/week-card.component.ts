import {Component, Input, OnChanges, SimpleChanges, SimpleChange} from '@angular/core';





@Component({
  selector: 'app-week-card',
  templateUrl: './week-card.component.html',
  styleUrls: ['./week-card.component.css'],
  animations: [

  ]
})
export class WeekCardComponent implements OnChanges {

  @Input() currentUser: any;
  @Input() golfers: any;
  @Input() date: any;


  constructor() { }

  ngOnChanges( changes: SimpleChanges) {

    for (const property in changes) {
      if (property === 'currentUser') {
        console.log('Previous:', changes[property].previousValue);
        console.log('Current:', changes[property].currentValue);
        console.log('firstChange:', changes[property].firstChange);
      }
    }

  }



}
