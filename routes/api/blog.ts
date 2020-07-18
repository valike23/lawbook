"use strict";
import { Iblog } from '../../utils/models';
import { mongodb, localMongo } from '../config'
import BlogDatabase from '../db/blog';
import * as express from 'express';
const router = express.Router();
let blogDb = new BlogDatabase(localMongo , 'lawbook');

router.post('/create',  (req: express.Request, res: express.Response) => {
    let blog: Iblog = req.body;
    blog.createdDate = new Date();
    blog.rate = 0;
    blog.views = 0;   
   blogDb.createBlog(res, blog); 
   
});
router.get('/top/:id',  (req: express.Request, res: express.Response) => {
    try { blogDb.getTopBlogs(res, <number><unknown>req.params.id) }
    catch (error) {
        res.status(403);
        res.json("parameter error");
        res.end();
    }
   
});
router.get('/all/:id', (req: express.Request, res: express.Response) => {
    try { blogDb.getAllBlogs(res, <number><unknown>req.params.id) }
    catch (error) {
        res.status(403);
        res.json("parameter error");
        res.end();
    }
});

router.get('/content/:id', (req: express.Request, res: express.Response) => {
    try { blogDb.getContent(res, <string><unknown>req.params.id) }
    catch (error) {
        res.status(403);
        res.json("parameter error");
        res.end();
    }
});

router.get('/favorites/:page/:id', (req: express.Request, res: express.Response) => {
    try { blogDb.createIndex(res) }
    catch (error) {
        res.status(403);
        res.json("parameter error");
        res.end();
    }
});

module.exports = router;
