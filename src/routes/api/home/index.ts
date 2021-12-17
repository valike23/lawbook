import type express from "express";
import { BlogDatabase } from "../../../controllers/blog";
import { Lib } from "../../../controllers/lib/libController";

const lib = new Lib();
const blog = new BlogDatabase();
export function get(req: any, res: express.Response,next: express.NextFunction){
   try {
    Promise.all([lib.retrieveBooks('books'), blog.getAllBlogs(1)]).then((values) => {
        //console.log(req.session.users.id);
        let data: any = {};
        if (req.session.users == {} || req.session.users == undefined) {
          data.id = false;   
        }
        else {
            data = req.session.users;
        }
        
        
        res.json( { books: values[0], articles: values[1], user: data});
    })
   } catch (error) {
       console.log(error);
       res.status(503).json(error);
   }
}