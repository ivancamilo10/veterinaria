import { Router } from "express";
import { authRequired } from "../auth/auth.middleware.js";
import { createPet, getMyPets } from "./pets.service.js";

const router = Router();

router.post("/", authRequired, async (req, res) => {
  try {
    const pet = await createPet(req.user.sub, req.body);
    res.status(201).json(pet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/my", authRequired, async (req, res) => {
  try {
    const pets = await getMyPets(req.user.sub);
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;