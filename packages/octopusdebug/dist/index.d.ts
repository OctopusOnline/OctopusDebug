import { Constructor } from './utils/constructor';
import { Connection } from 'mariadb';
export declare class OctopusDebug {
    #private;
    static get instance(): OctopusDebug;
    static getInstance(connection: Connection): OctopusDebug;
    private readonly connection;
    constructor(connection: Connection);
    init(): Promise<void>;
    log(executionClass: Constructor, executionMethod: Function, data: any): Promise<void>;
}
