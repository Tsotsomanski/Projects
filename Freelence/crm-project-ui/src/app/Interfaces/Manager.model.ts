import {Client} from './Client.model';

export interface Manager {
    managerId: number;
    name: string;
    registerDate: Date;
    isActive: boolean;
    isMasterManager: boolean;
    clients: [Client];
}
