import {Client} from './Client.model';

export interface Job {
    id: number;
    jobTypeId: number;
    additionalInfo: string;
    managerId: number;
    clientId: number;
    client: Client;
    deadline: Date;
    note: string;
    noteTime: Date;
    JobCreatedDate: Date;
    isDone: boolean;
}
