import { MongoClient, MongoError, Mongos, ObjectID, ObjectId } from 'mongodb';
import { timeStamp } from 'console';
import * as Express from 'express';
import {dbFree, localDb } from '../config';
import {createConnection, Connection, MysqlError } from 'mysql';
import { Ibook, IbookShelf } from '../../utils/models';
import {queryUpdateAndSelect, queryInsert} from './common';

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
        this.connection = createConnection(dbFree);
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
     
      let query = `INSERT INTO book set ? `;
      queryInsert(res, query,this.connection, book);     
     
    }
    retrieveBook(res: Express.Response, type: string ){
let query = `select * from book where type ='${type}'`;
queryUpdateAndSelect(res, query,this.connection);
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

    addToFavorite( res: Express.Response, bookShelf: IbookShelf ){
        let query = `UPDATE book_shelf SET favorite = ${true} WHERE book_id = ${bookShelf.book_id} and user_id = ${bookShelf.user_id}`;
       queryUpdateAndSelect(res, query, this.connection);
    }
  
createIndexFavorite(res: Express.Response){

}

   
}



export default libDatabase;