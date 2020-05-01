import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-tets',
  templateUrl: './tets.component.html',
  styleUrls: ['./tets.component.css']
})
export class TetsComponent implements OnInit {

  //ezt kapja az appbol
  @Input('parentData') public name;
  // emit vissza az appba
  @Output() public childEvent = new EventEmitter();
  public namee = "Bencee";
  public hasError = false;

  public colors = ["red", "greeen", "yellow", "blue"];

  constructor() { }

  ngOnInit(): void {
  }
  greetNight(){
    return "Good Night " + this.namee;
  }
  clickMethod(){
    console.log("hello");
  }
  logValue(value){
    console.log("Ez a logom:" + value);
  }

  emitEvent(){
    this.childEvent.emit('megerkezett az emit');
  }
}
