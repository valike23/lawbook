"use strict";
import { Ibook, IbookShelf } from '../../utils/models';
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
  
  var rawFile = req.files.raw.path;
    var thumbFile = req.files.thumb.path;
    let book: Ibook;
    book = req.body;
    cloud.uploader.upload(rawFile,
        { resource_type: "auto" } ,(err: UploadApiErrorResponse, content: UploadApiResponse )=>{
if(err){
  console.log(err.message);
  res.status(503);
  res.json(err.name);
  return;
}

cloud.uploader.upload(thumbFile, (err: UploadApiErrorResponse, picture: UploadApiResponse )=>{
  if(err){
  console.log(err.message)  ;
  res.status(503);
  res.json(err.name);
  return;
  }
  book.picture = picture.url;
  book.content = content.url;
  book.secure_content = content.secure_url;
  book.secured_picture = picture.secure_url;
  book.public_content = content.public_id;
  book.public_picture = picture.public_id;
  libDb.createPost(res, book);
  
  })

    })
   
});

router.get('/book/:id', function(req: express.Request, res: express.Response){
libDb.retrieveBook(res, req.params.id);
});

router.post('/addFavorite', function(req:express.Request, res: express.Response){
  let bookShelf = <IbookShelf> req.body;
  libDb.addToFavorite(res, bookShelf);
})

module.exports = router;