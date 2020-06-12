import { Component, OnInit } from '@angular/core';
import { 
  trigger,
  state,
  animate,
  transition,
  style
 } from '@angular/animations';

@Component({
  selector: 'app-animations-exercise',
  templateUrl: './animations-exercise.component.html',
  styleUrls: ['./animations-exercise.component.css'],
  animations: [
    trigger('divState', [
      state('normal', style({
        backgroundColor: 'red',
        transform: 'translateX(0)'
      })),
      state('highlighted', style({
        backgroundColor: 'green',
        transform: 'translateX(100px)'
      })),
      transition('normal <=> highlighted', animate(300)),
    ]),
    trigger('wildState', [
      state('normal', style({
        backgroundColor: 'red',
        transform: 'translateX(0)'
      })),
      state('highlighted', style({
        backgroundColor: 'green',
        transform: 'translateX(100px)'
      })),
      state('shrunken', style({
        backgroundColor: 'yellow',
        transform: 'translateX(0) scale(0.5)'
      })),
      transition('shrunken <=> *', animate(300)),
      transition('highlighted <=> *', animate(300)),
    ])
  ]
})
export class AnimationsExerciseComponent implements OnInit {

  list = ['Milk', 'Sugar', 'Bread'];
  state = 'normal';
  wildState = 'normal';

  ngOnInit() {
  }

  onAdd(item) {
    this.list.push(item);
  };

  onDelete(item) {
    this.list.splice(this.list.indexOf(item), 1);
  };

  onAnimate() {
    this.state == "normal"
      ? this.state = "highlighted"
      : this.state = 'normal';

    this.wildState == "normal"
      ? this.wildState = "highlighted"
      : this.wildState = 'normal';
  }

  onShrink() {
    this.wildState = "shrunken";
  }
}
