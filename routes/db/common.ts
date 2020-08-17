import * as Express from 'express';
import {MysqlError, Connection} from 'mysql';

export function queryUpdateAndSelect(res: Express.Response, query: string, connection: Connection): void {
    connection.query(query, function(err: MysqlError , result: any){
        if(err){
            res.status(503);
            res.json(err.message);
            console.log(err);
            return;
        }
        res.json(result);
        res.end();
              })
}

export function queryInsert(res: Express.Response, query: string, connection: Connection, data: any): void {
    connection.query(query, data, function(err: MysqlError , result: any){
        if(err){
            res.status(503);
            res.json(err.message);
            console.log(err);
            return;
        }
        res.json(result);
        res.end();
              })
}

