import {Component, OnInit} from '@angular/core';
import { CrmService } from '../services/crm.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss', '../../assets/common.scss']
})
export class TasksComponent implements OnInit {
    tasksObject: [object];
    tasksList: any = [];

    constructor( private crmService: CrmService) {
        crmService.showClientTasksEmitter.subscribe((data: any) => {
            const clientData = data;
            this.extractClientTasks(clientData);
        });
    }

    ngOnInit() {}

    onCreateTask(newClientTask: any): void {
        // TODO: Fix this to push in the object from the BE
        if (newClientTask !== '') {
            this.tasksObject.push(newClientTask);
        }
    }

    // TODO: Make interfaces once got the BE synced
    extractClientTasks(tasksData: any) {
        for (const client of tasksData.clientsData) {
            if (client.id === tasksData.clientId) {
                this.tasksObject = client.tasks;
                this.fillTasksNamesList(this.tasksObject);
            }
        }
    }

    fillTasksNamesList(tasksObj: [object]) {
        this.tasksList = [];
        for (const taskName in tasksObj) {
            if (tasksObj.length > 0) {
                this.tasksList.push(Object.keys(tasksObj[taskName]));
            }
        }
    }

}
