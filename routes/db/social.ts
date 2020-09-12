import { MongoClient, MongoError, Mongos, ObjectID, ObjectId } from 'mongodb';
import { timeStamp } from 'console';
import * as Express from 'express';
import { Ipost } from '../../utils/models';

class socialDatabase {
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

    createPost(res: Express.Response, post: Ipost) {
        this.connect().then((data: MongoClient) => {
            let name = this.name;
            
            const dbo = data.db(name);
            dbo.collection("post").insertOne(post, (err: MongoError, resd: any) => {
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
  
createIndexFavorite(res: Express.Response){

}
getAllPosts(res: Express.Response, page: number) {
    this.connect().then((data: MongoClient) => {
        let name = this.name;
console.log("look out");
        const dbo = data.db(name);
        dbo.collection("post").find({}/*,
            { projection: {"content":0} }*/)
            .sort({ createdDate: -1 })
            .skip(((page - 1) * this.difference))
            .limit(5).toArray((err: MongoError, result: Array<Ipost>) => {
            if (err) {
                this.errorHandler(res, err);
                return;
            }
            res.json(result);
            res.end();

        })

    }, (err: MongoError) => {
        this.errorHandler(res, err);
    })
}

    private errorHandler(res: Express.Response, error: MongoError) {
        res.status(503);
       res.json(error.message);
       console.log(error);
    }
   
}



export default socialDatabase;