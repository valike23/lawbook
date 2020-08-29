import * as Express from 'express';
import {MysqlError, Connection} from 'mysql';

export function queryUpdateAndSelect(res: Express.Response, query: string, connection: Connection): void {
    connection.query(query, function(err: MysqlError , result: any){
        if(err){
           sqlErrorHandler(res, err);
           return;
        }
        res.json(result);
        res.end();
              })
}

export function queryInsert(res: Express.Response, query: string, connection: Connection, data: any): void {
    connection.query(query, data, function(err: MysqlError , result: any){
        if(err){
           sqlErrorHandler(res, err);
           return;
        }
        res.json(result);
        res.end();
              })
}

export function sqlErrorHandler(res: Express.Response, error: MysqlError) {
    res.status(503);
   res.json({msg: error.message,
code: error.code});
   console.log(error);
}