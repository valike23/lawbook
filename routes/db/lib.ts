import { MongoClient, MongoError, Mongos, ObjectID, ObjectId } from 'mongodb';
import { timeStamp } from 'console';
import * as Express from 'express';
import {dbFree, localDb } from '../config';
import {createConnection, Connection } from 'mysql';
import { Ipost } from '../../utils/models';

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

    createPost(res: Express.Response, post: Ipost) {
      this.connection = createConnection(dbFree);
      this.connection.query
    }
  
createIndexFavorite(res: Express.Response){

}

    private errorHandler(res: Express.Response, error: MongoError) {
        res.status(503);
       res.json(error.message);
       console.log(error);
    }
   
}



export default libDatabase;