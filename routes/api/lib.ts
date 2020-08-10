"use strict";
import { Ipost } from '../../utils/models';
import { v2 as cloud, UploadApiErrorResponse, UploadApiResponse, ConfigOptions } from 'cloudinary';
import {} from 'multer';
const connectM = require('connect-multiparty');
const middleWare = connectM();
import {Auth} from '../auth';
const auth = new Auth();
import { mongodb, localMongo, cloudinary } from '../config';
cloud.config(cloudinary);
import * as express from 'express';
import libDatabase from '../db/lib';
const router = express.Router();
let libDb = new libDatabase(localMongo , 'lawbook');

// router.use((req: express.Request, res: express.Response, next: express.NextFunction) =>{
//   console.log("sound", req.headers.authorization);
//   if(auth.isAuth(req.headers.authorization)){
//     next(auth.isAuth(req.headers.authorization));
//   }
//   else{
//     res.status(406);
//     res.json("you are not logged in");
//     res.end();
//     return;
//   }



// })
router.post('/create', middleWare,  (req: any, res: express.Response) => {
  console.log(req.files);
  let config: ConfigOptions;
  
    var thumbFile = req.files.thumb.path;
    let post: Ipost;
    post = req.body;
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

    })
   
});

module.exports = router;