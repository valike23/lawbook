"use strict";
import { Iblog, IblogShelf} from '../../utils/models';
import { mongodb, localMongo, localDb } from '../config';
import BlogDatabase from '../db/blog';
import * as express from 'express';
import BlogSQL from '../db/blog.sql';
const router = express.Router();
let blogDb = new BlogDatabase(mongodb , 'lawbook');
let blogSQL = new BlogSQL();

router.post('/create',  (req: express.Request, res: express.Response) => {
    console.log("reached here");
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
    try { blogDb.getFavoritesBlog(res,<number><unknown> req.params.id) }
    catch (error) {
        res.status(403);
        res.json("parameter error");
        res.end();
    }
   
});

router.get('/blog_shelf/:user_id/:blog_id', (req: express.Request, res: express.Response) => {
   blogSQL.retrieveFromShelf(res, req.params.blog_id, <number><unknown> req.params.user_id);
   
});
router.post('/remove_favorite/:user_id/:blog_id', (req: express.Request, res: express.Response) => {
    blogSQL.removeFromFavorite(res, req.params.blog_id, <number><unknown> req.params.user_id);
    
 });
router.get('/all_blog_shelf/:user_id', (req: express.Request, res: express.Response) => {
    blogSQL.retrieveAllFromShelf(res, <number><unknown> req.params.user_id);
    
 });
 router.get('/all_author_blog/:user_id', (req: express.Request, res: express.Response) => {
    
    blogDb.getAuthorContent(res, <number><unknown> req.params.user_id);
    
 });
 router.post('/add_book_shelf', (req: express.Request, res: express.Response) => {
     let shelf : IblogShelf = req.body;
    blogSQL.addToShelf(res, shelf);
    
 });


router.get('/related', (req: express.Request, res: express.Response) => {
    try { blogDb.getAllBlogs(res, 1) }
    catch (error) {
        res.status(403);
        res.json("parameter error");
        res.end();
    }
});

module.exports = router;
