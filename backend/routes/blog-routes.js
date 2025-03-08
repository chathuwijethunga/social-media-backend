import express from "express";
import { getAllBlogs } from "../controllers/blog-controller";
import { addBlog, updateBlog } from "../controllers/blog-controller";
const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.post("/addBlog", addBlog);
blogRouter.put("/update/:id",updateBlog )
export default blogRouter;