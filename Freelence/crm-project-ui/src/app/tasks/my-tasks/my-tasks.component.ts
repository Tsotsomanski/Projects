import { Component, OnInit } from '@angular/core';
import {Job} from '../../Interfaces/Job.model';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.scss']
})
export class MyTasksComponent implements OnInit {
    tasksList: Job;

    constructor() { }

    ngOnInit() {}
}
