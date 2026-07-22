import { Router } from "express";
import { authRequired } from "../auth/auth.middleware.js";
import { createComment, getCommentsByPost } from "./comments.service.js";

const router = Router();

router.post("/", authRequired, async (req, res) => {
  try {
    const comment = await createComment(req.user.sub, req.body);
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/post/:postId", async (req, res) => {
  try {
    const comments = await getCommentsByPost(req.params.postId);
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;