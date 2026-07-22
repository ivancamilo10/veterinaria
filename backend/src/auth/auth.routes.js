import { Router } from "express";
import { registerUser, loginUser } from "./auth.service.js";
import { authRequired } from "./auth.middleware.js";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const data = await loginUser(req.body);
    res.json(data);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

router.get("/me", authRequired, async (req, res) => {
  res.json({ user: req.user });
});

export default router;