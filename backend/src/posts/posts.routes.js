import { Router } from "express";
import { authRequired } from "../auth/auth.middleware.js";
import { createPost, getFeed } from "./posts.service.js";

const router = Router();

router.post("/", authRequired, async (req, res) => {
  try {
    const post = await createPost(req.user.sub, req.body);
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/feed", authRequired, async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 20;
    const feed = await getFeed(limit);
    res.json(feed);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;