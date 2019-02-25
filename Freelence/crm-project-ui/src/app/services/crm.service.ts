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

    setNewClient(ClientName: string) {
        const email: string = 'sn3ts@abv.bg';
        const name: string = ClientName;
        const phone: string = '09884712374';
        const managerId: number = 1;

        const clientInfo = {
            Name: name,
            Email: email,
            Phone: phone,
            ManagerId: managerId,
        };

        const api: string = 'Clients';
        return this.http.post(this.url + api, JSON.stringify(clientInfo));
    }

    setClientsData(clientsData: [Client]) {
        this.clientsData = clientsData;
        this.crmDataLoadedEmitter.emit(this.clientsData);
    }

    passId (clientId: number) {
        this.showClientTasksEmitter.emit(clientId);
    }
}
