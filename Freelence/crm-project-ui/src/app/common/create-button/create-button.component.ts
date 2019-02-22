import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-create-button',
    templateUrl: './create-button.component.html',
    styleUrls: ['./create-button.component.scss']
})
export class CreateButtonComponent implements OnInit {
    isInputShown: boolean;
    isBlue: boolean;
    @Input() btnColor: string;
    @Input() activity: string;
    @Output() handleSubmit: EventEmitter<any> = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit() {
        this.btnColor === 'blue' ? this.isBlue = true : this.isBlue = false;
    }

    openInputForm(): void {
        this.isInputShown = !this.isInputShown;
    }

    onHandleSubmit(event: any, value: string): void {
        event.preventDefault();
        this.handleSubmit.emit(value);
        this.isInputShown = !this.isInputShown;
    }
}
