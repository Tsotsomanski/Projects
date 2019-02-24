import {Component, OnInit, OnDestroy} from '@angular/core';
import {Client} from '../Interfaces/Client.model';
import {Subscription} from 'rxjs';
import { CrmService } from '../services/crm.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss', '../../assets/common.scss']
})
export class TasksComponent implements OnInit, OnDestroy {
    private crmDataLoadedSubscribtion: Subscription;
    clientsData: [Client];
    currentClientData: Client;
    allActiveTasks: [string];

    constructor( private crmService: CrmService ) {}

    ngOnInit() {
        this.crmDataLoadedSubscribtion = this.crmService.crmDataLoadedEmitter.subscribe((data: any) => {
            this.clientsData = data;
            this.takeAllActiveTasks(this.clientsData);
        });
    }

    onCurrentClientSelected(currentClient: Client) {
        this.currentClientData = currentClient;
    }

    takeAllActiveTasks(data: [Client]) {
        if (data) {
            for (const clientIndex in this.clientsData) {
                const currentClient = this.clientsData[clientIndex];
                const currentTasks = this.clientsData[clientIndex].jobs;
                if (currentTasks.length > 0) {
                    for (const taskIndex in currentTasks) {
                        const currentTask = currentClient.jobs[taskIndex];
                    }
                }
            }
        }
    }
    // TODO: Extend the function above once have the BE;
    // onst isTaskActive = currentTask.isActive;
    //                     if (isTaskActive) {
    //                         this.allActiveTasks.push(currentTask.name);
    //                     }

    ngOnDestroy() {
        this.crmDataLoadedSubscribtion.unsubscribe();
    }
}
