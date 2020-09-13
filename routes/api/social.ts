"use strict";
import { Ipost, Isession } from '../../utils/models';
import { v2 as cloud, UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import {} from 'multer';
const connectM = require('connect-multiparty');
const middleWare = connectM();
import {Auth} from '../auth';
const auth = new Auth();
let session: Isession;
import { mongodb, localMongo, cloudinary } from '../config';
cloud.config(cloudinary);
import * as express from 'express';
import socialDatabase from '../db/social';
const router = express.Router();
let socialDb = new socialDatabase(mongodb , 'lawbook');

router.use((req: express.Request, res: express.Response, next: express.NextFunction) =>{
  console.log("sound", req.headers.authorization);
  if(auth.isAuth(req.headers.authorization)){
    next();
  }
  else{
    res.status(406);
    res.json("you are not logged in");
    res.end();
    return;
  }



})
router.post('/create_post', middleWare,  (req: any, res: express.Response) => {
  let session: Isession = <Isession>auth.isAuth(req.headers.authorization);
  console.log('req.files');
  
    var thumbFile = req.files.thumb.path;
    let post: Ipost;
    post = req.body;
    post.name = session.user.firstname + " " + session.user.lastname;
    
    post.userId = 7;
    post.createdDate = new Date();
    post.likes = 0;
    post.dislikes = 0;
    cloud.uploader.upload(thumbFile, (err: UploadApiErrorResponse, response: UploadApiResponse )=>{
if(err){
  console.log(err.message)  ;
  res.status(503);
  res.json(err.name);
  return;
}

post.secureImage = response.secure_url;
post.image = response.url;
post.publicId = response.public_id;
socialDb.createPost(res, post)

    })
   
});
router.post('/create',  (req: express.Request, res: express.Response) => {
  try {
    console.log("test", req.headers);
    let session: Isession = <Isession>auth.isAuth(req.headers.authorization);
    console.log("test", req.body);
  let temp: Ipost = {
    post: req.body.post
    };
    
    let post: Ipost = temp;
    post.name = session.user.firstname + " " + session.user.lastname;
    post.profilePics = session.user.dp;
    post.userId = session.user.id;
    post.createdDate = new Date();
    post.likes = 0;
    post.dislikes = 0;

socialDb.createPost(res, post)
  }
  catch (err) {

     res.status(403);
      res.json(err);
      res.end();
  }
 
  
   
});
router.get('/all/:id', (req: express.Request, res: express.Response, next: express.NextFunction) => {
 let session: Isession = <Isession>auth.isAuth(req.headers.authorization);
 console.log(session.user.firstname);
  try { socialDb.getAllPosts(res, <number><unknown>req.params.id) }
  catch (error) {
      res.status(403);
      res.json("parameter error");
      res.end();
  }
});

module.exports = router;