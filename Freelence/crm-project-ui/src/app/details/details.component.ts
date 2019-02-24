import {Component, Input, OnInit} from '@angular/core';
import {Client} from '../Interfaces/Client.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
    @Input() currentClientData: Client;

    constructor() {}

    ngOnInit() {}
}
