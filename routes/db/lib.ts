import { MongoClient, MongoError, Mongos, ObjectID, ObjectId } from 'mongodb';
import { timeStamp } from 'console';
import * as Express from 'express';
import {dbFree, localDb } from '../config';
import {createConnection, Connection, MysqlError } from 'mysql';
import { Ibook } from '../../utils/models';

class libDatabase {
    uri: string;
    name: string;
    difference: number;
    client: MongoClient;
    connection: Connection;
    constructor(uri: string, name: string) {
        this.uri = uri;
        this.name = name;
        this.difference = 10;
    }
    private connect() {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.uri).then((mongoClient: MongoClient) => {
                this.client = mongoClient;
                resolve(mongoClient);
            }, (error) => {
                reject(error);
            })
        })


    }

    private errorHandler(res: Express.Response, error: MongoError) {
        res.status(503);
       res.json(error.message);
       console.log(error);
    }
    private sqlErrorHandler(res: Express.Response, error: MysqlError) {
        res.status(503);
       res.json(error.message);
       console.log(error);
    }
    createPost(res: Express.Response, book: Ibook) {
      this.connection = createConnection(dbFree);
      let query = `INSERT INTO book set ? `;
      this.connection.query(query, book, function(err: MysqlError , result: any){
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
    retrieveBook(res: Express.Response, type: string ){
this.connection = createConnection(dbFree);
let query = `select * from book where type ='${type}'`;
this.connection.query(query, function(err: MysqlError , result: any){
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
  
createIndexFavorite(res: Express.Response){

}

   
}



export default libDatabase;