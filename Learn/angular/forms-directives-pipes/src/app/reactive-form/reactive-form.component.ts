import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControlName, FormControl, Validator, Validators } from '@angular/forms'; 

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {

  form = new FormGroup({
    "currentPass": new FormControl('', [Validators.required, Validators.minLength(3)]),
    "newPass": new FormControl(''),
    "matchPass": new FormControl('')
  });
  currentPass = '123';

  constructor() { }

  ngOnInit() {
  }

  log() {
    if(this.form.get('currentPass').value != this.currentPass) {
      alert("Current password is wrong");
    }
    if(this.form.get('newPass').value != this.form.get('matchPass').value){
      alert("Password mismatched");
    }
  }
}
