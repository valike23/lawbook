
import { Db, Double, MongoClient, MongoError, ObjectId } from 'mongodb';
import type * as Express from 'express';
import { Iblog, Icomment, mongoURI, mysqlConnection} from '../utils/models';
import moment from 'moment';
import { createConnection, MysqlError, Connection} from "mysql";


export class BlogDatabase {
    uri: string;
    name: string;
    difference: number;
    client: MongoClient;
    connection: Connection;

    constructor() {
        this.uri = mongoURI;
        this.name = 'lawbook';
        this.difference = 10;
        this.connection = createConnection(mysqlConnection);
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

    createBlog(  blog: Iblog) {
        return new Promise((resolve, reject) => {
            console.log(blog);
            this.connect().then((data: MongoClient) => {
                let name = this.name;

                const dbo = data.db(name);
                dbo.collection("blog").insertOne(blog, (err: MongoError, resd: any) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(resd);
                })

            }, (err: MongoError) => {
                console.log(err);
                reject(err);
                return;

            })
        })
    }
    getTopBlogs(  page: number) {
        return new Promise((resolve, reject) => {
            this.connect().then((data: MongoClient) => {
                let name = this.name;
                
                const dbo = data.db(name);
                dbo.collection("blog").find({},
                    { projection: { "content": 0 } })
                    .sort({ rate: -1 }).skip(((page - 1) * this.difference))
                    .limit(6).toArray((err: MongoError, result: Array<Iblog>) => {
                    if(err){
                       
                        reject(err);
                        return;
                    }
                        resolve(result);
    
                })
    
            }, (err: MongoError) => {
                    reject(err);
            })
       
       })
   
    }
  getAllBlogs(page: number): Promise<Iblog[]> {
    console.log("enter blogs");
    let blogs: Array<Iblog>
      return new Promise((resolve, reject) => {
        
        
      this.connect().then((data: MongoClient) => {
        let name = this.name;

        const dbo = data.db(name);
        dbo.collection("blog").find({},
            { projection: {"content":0} })
            .sort({ createdDate: -1 })
            .skip(((page - 1) * this.difference))
            .limit(20).toArray((err: MongoError, result: Array<Iblog>) => {
            if (err) {
              reject(err);
             
              }
              result.forEach(function (data, index) {
                var test: string;
              test =  data.createdDate.toISOString();
                  
                  result[index].formatedDate = moment(test).fromNow();
                  console.log( result[index].formatedDate);
              })
              resolve(result);
              
        })

    }, (err: MongoError) => {
          reject(err);
    })

      })
    }

    getSearchBlog(page: number, search: string): Promise<Iblog[]> {
        console.log("enter blogs");
        let blogs: Array<Iblog>
          return new Promise((resolve, reject) => {
            
            
          this.connect().then((data: MongoClient) => {
            let name = this.name;
    
            const dbo = data.db(name);
            dbo.collection("blog").find({'title': {'$regex': search, '$options': 'i'}},
                { projection: {"content":0} })
                .sort({ createdDate: -1 })
                .skip(((page - 1) * this.difference))
                .limit(6).toArray((err: MongoError, result: Array<Iblog>) => {
                if (err) {
                  reject(err);
                 
                  }
                  result.forEach(function (data, index) {
                    var test: string;
                  test =  data.createdDate.toISOString();
                      
                      result[index].formatedDate = moment(test).fromNow();
                      console.log( result[index].formatedDate);
                  })
                  resolve(result);
                  
            })
    
        }, (err: MongoError) => {
              reject(err);
        })
    
          })
        }
    
    //createComment(comment: Icomment, id: string): Promise<any> {
    //    var vm = this;
    //    comment.createdDate = new Date();
    //    return new Promise(function (resolve, reject) {
           
    //        let OBJECT_ID: ObjectID = new ObjectId(id);
    //        console.log(OBJECT_ID);
    //        vm.connect().then((data: MongoClient) => {
    //            console.log(comment);
    //                const dbo = data.db(vm.name);
                    
    //                dbo.collection('blog').updateOne({ '_id': OBJECT_ID }, { $push: { comments: comment } }).then(
    //                    function (res: any) {
    //                        console.log("res", res);
    //                        resolve(res);
    //                        return;
    //                    }, function (err) {
    //                        console.log("error", err);
    //                        reject(err)
    //                        return;
    //                  }
    //              )
        
        
    //            }, (err: MongoError) => {
    //                    console.log("mongo error",err)
    //                    reject(err);
    //                    return;
                   
    //            })
    //    })
      
    //}

    getComments(blog: string,page: number) {
        return new Promise(async (resolve, reject) => {
            
            try {
              let data: MongoClient = await  this.connect() as unknown as MongoClient;
              if(data){
                  let name = this.name;
                  let comments: Icomment[] = [];
                  const dbo = data.db(name);
                 comments = <Icomment[]> await dbo.collection('blogComments').find({blogId: blog}).limit(20).skip((page -1) * 20).toArray();
                 resolve(comments)
              }
            } catch (error) {
                reject(error);
            }
        })
    }
  
    getContent(  id: string) {
        return new Promise((resolve, reject) => {
            this.connect().then((data: MongoClient) => {
                let name = this.name;
                const OBJECT_ID = new ObjectId(id);
                console.log(OBJECT_ID);
                var newvalues = { $inc: { views:  1 } };
                const dbo = data.db(name);
                let myBlog: Iblog;
                dbo.collection("blog").findOneAndUpdate({ '_id': OBJECT_ID }, newvalues).then((result: any) => {
                    myBlog = <Iblog>result.value;
                    let test = myBlog.createdDate.toISOString();
                    myBlog.formatedDate = moment(test).fromNow();
                    resolve(myBlog);
                    this.updateRate(myBlog, data, OBJECT_ID);
                    }, (err: MongoError) => {
                        reject(err);
                    })
    
            }, (err: MongoError) => {
                    reject(err);
            })
        
    })
    
    }

    getAuthorContent(  id: any) {
        this.connect().then((data: MongoClient) => {
            let name = this.name;

            const dbo = data.db(name);
           
            let query = {authorId:parseInt(id)};
         //   let projecton = { projection: { _id: 1, content: 0, image: 0 } };
            dbo.collection("blog").find(query)
               .toArray((err: MongoError, result: Array<Iblog>) => {
                if (err) {
                    this.errorHandler( err);
                    return;
                }
              

            })

        }, (err: MongoError) => {
            this.errorHandler( err);
        })
    }

 getFavoritesBlog(res:Express.Response, id: number){
    this.connect().then((data: MongoClient) => {
        let name = this.name;
        const dbo = data.db(name);
        console.log("entered");
        dbo.collection('favorites').find({}).toArray().then((results)=>{
            console.log(results);
          

        },(err: MongoError)=>{
this.errorHandler( err);
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


    private errorHandler(  error: MongoError) {
      
       console.log(error);
    }
   
}


