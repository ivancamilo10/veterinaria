import { Router } from "express";
import { authRequired } from "../auth/auth.middleware.js";
import {
  getMyNotifications,
  markNotificationAsRead
} from "./notifications.service.js";

const router = Router();

router.get("/my", authRequired, async (req, res) => {
  try {
    const notifications = await getMyNotifications(req.user.sub);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/:id/read", authRequired, async (req, res) => {
  try {
    const updated = await markNotificationAsRead(req.user.sub, req.params.id);
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;