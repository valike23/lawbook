import { MongoClient, MongoError, Mongos, ObjectID, ObjectId } from 'mongodb';
import { timeStamp } from 'console';
import * as Express from 'express';
import { Ipersonality } from '../../utils/models';

export class HomeDatabase {
    uri: string;
    name: string;
    difference: number;
    client: MongoClient;
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

    addPersonalities(res: Express.Response, personalities: Array<Ipersonality>) {
        this.connect().then((data: MongoClient) => {
            let name = this.name;
            for (let index = 0; index < personalities.length; index++) {
                personalities[index].createdDate = new Date();                
            }
            const dbo = data.db(name);
            dbo.collection("personalities").insertMany(personalities, (err: MongoError, resd: any) => {
                if (err) {
                    res.status(503);
                    res.json(err.message);
                    console.log(err);
                    return;
                }
                res.json(resd);
                res.end();

            })





        }, (err: MongoError) => {
            console.log(err);
           
        })
    }
    getPersonalities(res: Express.Response) {
        this.connect().then((data: MongoClient) => {
            let name = this.name;
            
            const dbo = data.db(name);
            dbo.collection("personalities").find({}).toArray().then((result) => {
               res.json(result);
                res.end();

            },(err: MongoError) =>{
                this.errorHandler(res, err);
            })

        })
    }

    private errorHandler(res: Express.Response, error: MongoError) {
        res.status(503);
       res.json(error.message);
       console.log(error);
    }
   
}



export default HomeDatabase;