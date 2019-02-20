import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-create-button',
    templateUrl: './create-button.component.html',
    styleUrls: ['./create-button.component.scss']
})
export class CreateButtonComponent implements OnInit {
    isInputShown;
    isBlue;
    @Input() btnColor;
    @Input() activity;
    @Output() handleSubmit: EventEmitter<any> = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit() {
        this.btnColor === 'blue' ? this.isBlue = true : this.isBlue = false;
    }

    openInputForm() {
        this.isInputShown = !this.isInputShown;
    }

    onHandleSubmit(event, value) {
        event.preventDefault();
        this.handleSubmit.emit(value);
        this.isInputShown = !this.isInputShown;
    }
}
