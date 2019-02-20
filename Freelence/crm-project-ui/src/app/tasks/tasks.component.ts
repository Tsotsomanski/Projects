import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss', '../../assets/common.scss']
})
export class TasksComponent implements OnInit {
    tasks = ['Make create client button', 'Make create task button', 'Make Clients section', 'Make Tasks section', 'Make Details section'];

    constructor() { }

    ngOnInit() {}

    onCreateTask(newClientTask) {
        if (newClientTask !== '') {
            this.tasks.push(newClientTask);
        }
    }
}
