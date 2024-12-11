import { Constructor } from './utils/constructor';
import { Connection } from 'mariadb';

export class OctopusDebug {

  static #instance: OctopusDebug;

  static get instance(): OctopusDebug {
    return this.#instance;
  }

  static getInstance(connection: Connection): OctopusDebug {
    return this.#instance ?? (this.#instance = new OctopusDebug(connection));
  }

  private readonly connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  async init(): Promise<void> {
    await this.connection.query(`
      CREATE TABLE IF NOT EXISTS OctopusDebug (
        timestamp  TIMESTAMP    NOT NULL,
        className  VARCHAR(255) NOT NULL,
        methodName VARCHAR(255) NOT NULL,
        data       TEXT         NOT NULL,

        PRIMARY KEY (timestamp)
      )
    `);
  }

  async log(executionClass: Constructor, executionMethod: Function, data: any): Promise<void> {
    await this.connection.query(`
      INSERT INTO OctopusDebug (timestamp, className, methodName, data)
      VALUES (?, ?, ?, ?)
    `, [new Date, executionClass.constructor.name, executionMethod.name, JSON.stringify(data)]);
  }
}