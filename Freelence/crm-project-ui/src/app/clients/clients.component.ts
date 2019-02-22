import {Component, OnInit, OnDestroy} from '@angular/core';
import { CrmService } from '../services/crm.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss', '../../assets/common.scss']
})

export class ClientsComponent implements OnInit, OnDestroy {
    private crmData: any;
    isInputShown: Boolean = false;
    clientsData: any;
    crmServiceSubscription: Subscription;

    constructor( private crmService: CrmService ) {}

    ngOnInit() {
        this.crmServiceSubscription = this.crmService.getCrmData().subscribe(data => {
            this.crmData = data;
            this.clientsData = this.crmData.clients;
        });
    }

    onCreateClient(newClientName: string): void {
        if (newClientName !== '') {
            // TODO: Fix this to push in the object from the BE
            this.clientsData.push(newClientName);
        }
    }

    showClientsTasks(clientId: string) {
        this.crmService.setClientTasksInfo(this.clientsData, clientId);
    }

    ngOnDestroy() {
        this.crmServiceSubscription.unsubscribe();
    }
}
