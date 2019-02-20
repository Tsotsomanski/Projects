import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss', '../../assets/common.scss']
})

export class ClientsComponent implements OnInit {
    createBtnType = 'clients';
    isInputShown = false;
    clients = ['Evgeni', 'Alexander', 'Georgi', 'Ivoylo', 'Dimitar'];
    newClient = '';

    constructor() { }

    ngOnInit() {}

    onCreateClient(newClientName) {
        if (newClientName !== '') {
            this.clients.push(newClientName);
        }
    }
}
