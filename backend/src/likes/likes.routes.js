import { Router } from "express";
import { authRequired } from "../auth/auth.middleware.js";
import { toggleLike, getLikesCount } from "./likes.service.js";

const router = Router();

router.post("/:postId/toggle", authRequired, async (req, res) => {
  try {
    const result = await toggleLike(req.user.sub, req.params.postId);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/:postId/count", async (req, res) => {
  try {
    const result = await getLikesCount(req.params.postId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;