import {Component, OnInit, OnDestroy} from '@angular/core';
import { CrmService } from '../services/crm.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss', '../../assets/common.scss']
})
export class ClientsComponent implements OnInit, OnDestroy {
    private crmServiceSubscription: Subscription;
    clientsData: any;

    constructor( private crmService: CrmService ) {}

    ngOnInit() {
        this.crmServiceSubscription = this.crmService.getCrmData().subscribe(data => {
            this.clientsData = data;
            this.crmService.setClientsData(this.clientsData);
        });
    }

    showClientTasks(clientId: number) {
        this.crmService.passId(clientId);
    }

    createClient(newClientName: string) {
        this.crmService.setNewClient(newClientName).subscribe(data => {
            console.log(data);
        });
    }

    ngOnDestroy() {
        this.crmServiceSubscription.unsubscribe();
    }
}
