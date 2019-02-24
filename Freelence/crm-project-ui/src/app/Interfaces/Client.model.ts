import {Manager} from './Manager.model';
import {Job} from './Job.model';
import {Bucket} from './Bucket.model';

export interface Client {
    id: number;
    name: string;
    email: string;
    phone: string;
    registerDate: Date;
    birthDate: Date;
    managerId?: number;
    manager?: Manager;
    bucketId?: number;
    bucket?: Bucket;
    jobs: [Job];
}
