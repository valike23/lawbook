import type express from "express";
import { BlogDatabase } from "../../../controllers/blog";

import type { Iblog } from "../../../utils/models";

const blogDb = new BlogDatabase()

export async function get(req: express.Request, res: express.Response) {

    try {

      
     let data: Iblog = await blogDb.getContent(req.query.id as unknown as string) as unknown as Iblog;
     res.json(data);
    } catch (error) {
      
    }
  }