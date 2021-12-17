import express from 'express';
const router = express.Router();
import { Lib } from '../../../controllers/lib/libController';
import { BlogDatabase } from '../../../controllers/blog';

const lib = new Lib();
const blog = new BlogDatabase();

router.get('/', (req: any, res: express.Response,next: express.NextFunction) => {
   
    Promise.all([lib.retrieveBooks('books'), blog.getAllBlogs(1)]).then((values) => {
        //console.log(req.session.users.id);
        let data: any = {};
        if (req.session.users == {} || req.session.users == undefined) {
          data.id = false;   
        }
        else {
            data = req.session.users;
        }
        
        
        res.render('home/index', { books: values[0], articles: values[1], user: data});
    })
   
});

router.get('/signout', (req: any, res: express.Response) => {
    req.session.users == {};
    res.json('logged out');
})

router.get('/search', (req: express.Request, res: express.Response,next: express.NextFunction) => {
    console.log(req.query);
    blog.getSearchBlog(1, <string><unknown>req.query.search).then(function (result) {
       
        res.render('home/blog', {user: 'blog', blogs: result, search:req.query.search});
    })
 //   res.sendFile(req.query.root + "/pages/search/blog.html");
   
   
});

router.get('/login',(req, res) => {
    res.render('home/login',{user:'home'})
})

export default router;