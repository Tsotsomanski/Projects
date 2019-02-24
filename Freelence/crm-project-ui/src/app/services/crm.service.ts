import {EventEmitter, Injectable, Output} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Client} from '../Interfaces/Client.model';

@Injectable({
  providedIn: 'root'
})
export class CrmService {
    private url: string = 'https://localhost:44360/api/';
    public showClientTasksEmitter: EventEmitter<any> = new EventEmitter();
    public crmDataLoadedEmitter: EventEmitter<any> = new EventEmitter();
    private clientsData: [Client];

    constructor(private http: HttpClient) {}

    getCrmData() {
        const api: string = 'Clients';
        return this.http.get(this.url + api);
    }

    setNewClient(name: string) {
        const email: string = 'sn3ts@abv.bg';
        const phone: string = '0988752291';
        const password: string = 'password';
        const clientInfo = {
            name: name,
            email: email,
            phone: phone,
            password: password
        };
        const api: string = 'Clients';

        this.http.post(this.url + api, clientInfo);
    }

    setClientsData(clientsData: [Client]) {
        this.clientsData = clientsData;
        this.crmDataLoadedEmitter.emit(this.clientsData);
    }

    passId (clientId: number) {
        this.showClientTasksEmitter.emit(clientId);
    }
}
