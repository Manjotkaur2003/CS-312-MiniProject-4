import { posts } from "../models/posts.js";
import { v4 as uuidv4 } from "uuid";

export const getAllPosts = (req, res) => res.json(posts);

export const createPost = (req, res) => {
    const { title, body, author } = req.body;
    if (!title || !body || !author)
        return res.status(400).json({ message: "Missing fields" });
    const newPost = { id: uuidv4(), title, body, author };
    posts.push(newPost);
    res.json(newPost);
};

export const updatePost = (req, res) => {
    const { id } = req.params;
    const { title, body, author } = req.body;
    const post = posts.find((p) => p.id === id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.author !== author)
        return res.status(403).json({ message: "Not authorized" });
    post.title = title;
    post.body = body;
    res.json(post);
};

export const deletePost = (req, res) => {
    const { id } = req.params;
    const { author } = req.body;
    const idx = posts.findIndex((p) => p.id === id);
    if (idx === -1) return res.status(404).json({ message: "Post not found" });
    if (posts[idx].author !== author)
        return res.status(403).json({ message: "Not authorized" });
    posts.splice(idx, 1);
    res.json({ message: "Post deleted" });
};
