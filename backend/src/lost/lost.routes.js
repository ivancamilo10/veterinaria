import { Router } from "express";
import { authRequired } from "../auth/auth.middleware.js";
import {
  createLostReport,
  getActiveLostReports,
  addSighting,
  getSightingsByReport,
  closeLostReport
} from "./lost.service.js";

const router = Router();

router.post("/reports", authRequired, async (req, res) => {
  try {
    const report = await createLostReport(req.user.sub, req.body);
    res.status(201).json(report);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/reports", async (req, res) => {
  try {
    const reports = await getActiveLostReports();
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/sightings", authRequired, async (req, res) => {
  try {
    const sighting = await addSighting(req.user.sub, req.body);
    res.status(201).json(sighting);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/reports/:id/sightings", async (req, res) => {
  try {
    const sightings = await getSightingsByReport(req.params.id);
    res.json(sightings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/reports/:id/close", authRequired, async (req, res) => {
  try {
    const updated = await closeLostReport(req.user.sub, req.params.id);
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;