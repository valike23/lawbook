import { BlogDatabase } from "../../../controllers/blog";
import type express from 'express';

export async function get(req: express.Request, res: express.Response) {
    try {

        const blogDb = new BlogDatabase();
        let comments = await blogDb.getComments(req.query.id as string, req.query.page as unknown as number);
        res.json(comments);
    } catch (error) {
        console.log(error);
        res.status(503).json(error);
    }
}