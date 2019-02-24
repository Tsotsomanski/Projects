import {Client} from './Client.model';

export interface Bucket {
    id: number;
    name: string;
    clients: [Client];
}
