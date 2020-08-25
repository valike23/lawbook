import { MongoClient, MongoError, Mongos, ObjectID, ObjectId } from 'mongodb';
import { timeStamp } from 'console';
import * as Express from 'express';
import { Iblog } from '../../utils/models';

class BlogDatabase {
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

    createBlog(res: Express.Response, blog: Iblog) {
        console.log(blog);
        this.connect().then((data: MongoClient) => {
            let name = this.name;
            
            const dbo = data.db(name);
            dbo.collection("blog").insertOne(blog, (err: MongoError, resd: any) => {
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
    getTopBlogs(res: Express.Response, page: number) {
        this.connect().then((data: MongoClient) => {
            let name = this.name;
            
            const dbo = data.db(name);
            dbo.collection("blog").find({},
                { projection: { "content": 0 } })
                .sort({ rate: -1 }).skip(((page - 1) * this.difference))
                .limit(5).toArray((err: MongoError, result: Array<Iblog>) => {
                if(err){
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
    getAllBlogs(res: Express.Response, page: number) {
        this.connect().then((data: MongoClient) => {
            let name = this.name;

            const dbo = data.db(name);
            dbo.collection("blog").find({},
                { projection: {"content":0} })
                .sort({ createdDate: -1 })
                .skip(((page - 1) * this.difference))
                .limit(5).toArray((err: MongoError, result: Array<Iblog>) => {
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
  
    getContent(res: Express.Response, id: string) {
        this.connect().then((data: MongoClient) => {
            let name = this.name;
            const OBJECT_ID = new ObjectId(id);
            console.log(OBJECT_ID);
            var newvalues = { $inc: { views:  1 } };
            const dbo = data.db(name);
            let myBlog: Iblog;
            dbo.collection("blog").findOneAndUpdate({ '_id': OBJECT_ID }, newvalues).then((result: any) => {
                myBlog = <Iblog>result.value;
                res.json(myBlog);
                res.end();
                this.updateRate(myBlog, data, OBJECT_ID);
                }, (err: MongoError) => {
                    this.errorHandler(res, err);
                })

        }, (err: MongoError) => {
            this.errorHandler(res, err);
        })
    }



 getFavoritesBlog(res:Express.Response, id: number){
    this.connect().then((data: MongoClient) => {
        let name = this.name;
        const dbo = data.db(name);
        console.log("entered");
        dbo.collection('favorites').find({}).toArray().then((results)=>{
            console.log(results);
            res.json(results);
            res.end();

        },(err: MongoError)=>{
this.errorHandler(res, err);
        })
    
    
    })

}
createIndexFavorite(res: Express.Response){

}

    private updateRate(blog: Iblog, db: MongoClient, OBJECT_ID: ObjectId) {
        let name = this.name;
        const dbo = db.db(name);
        blog.views = blog.views + 1;
        let timeDifference = (new Date().getTime() - blog.createdDate.getTime()) / 1000 * 3600;
        blog.rate = (blog.views * 1000)/timeDifference;
        console.log(blog.rate);
        dbo.collection("blog").findOneAndUpdate({ '_id': OBJECT_ID }, {
            $set: {
                rate: blog.rate
            }
        }).then((result: any) => {
           
            console.log(result);
        }, (err: MongoError) => {
            console.log(err);
        })
    }


    private errorHandler(res: Express.Response, error: MongoError) {
        res.status(503);
       res.json(error.message);
       console.log(error);
    }
   
}



export default BlogDatabase;