/*import { Component, OnInit, Output, EventEmitter} from '@angular/core';*/
import {Component} from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  /*@Output() selectedFeatureEvent = new EventEmitter<string>();*/

  constructor() { }

  ngOnInit() {

  }

  /*onSelected(selectedEvent: string) {
    this.selectedFeatureEvent.emit(selectedEvent);
  }*/

}
