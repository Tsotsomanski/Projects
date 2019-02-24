import {Component, EventEmitter, Input, Output, OnInit, OnDestroy} from '@angular/core';
import {Client} from '../../Interfaces/Client.model';
import {CrmService} from '../../services/crm.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-tasks-per-client',
    templateUrl: './tasks-per-client.component.html',
    styleUrls: ['./tasks-per-client.component.scss']
})
export class TasksPerClientComponent implements OnInit, OnDestroy {
    @Input() clientsData: [Client];
    @Output() currentClientSelected: EventEmitter<any> = new EventEmitter();
    private showClientSubscribtion: Subscription;
    private currentClientId: number;
    private currentClient: Client;
    tasksList: any;

    constructor(private crmService: CrmService) {}

    ngOnInit() {
        this.showClientSubscribtion = this.crmService.showClientTasksEmitter.subscribe((id: number) => {
            this.currentClientId = id;
            this.getClientTasks(this.currentClientId);
        });
    }

    getClientTasks(clientId: number) {
        this.currentClient = this.findCurrentClient(this.clientsData, clientId);
        this.currentClientSelected.emit(this.currentClient);
        this.fillTasksPerClient(this.currentClient.jobs);
    }

    findCurrentClient(clientsData: [Client], clientId: number): Client {
        for (const clientIndex in clientsData) {
            if (clientsData[clientIndex].id === clientId) {
                return clientsData[clientIndex];
            }
        }
    }

    fillTasksPerClient(clientTasks: any) {
        if (clientTasks.length > 0) {
            this.tasksList = [];
            for (const taskName in clientTasks) {
                this.tasksList.push(Object.keys(clientTasks[taskName]));
            }
        }
    }

    ngOnDestroy() {
        this.showClientSubscribtion.unsubscribe();
    }
}
