import type express from "express";
import { BlogDatabase } from "../../../controllers/blog"
import type { Iblog } from "../../../utils/models";

const blogDb = new BlogDatabase()
export async function get(req, res) {
  try {
    let data: Iblog[] = await  blogDb.getAllBlogs(1);
    res.json(data);
  } catch (error) {
      
  }
}

