import { Router } from "express";
import { computeChild } from "../controllers/generate-child";
const router = Router();

/**
 * @swagger
 * /generate-secret-child:
 *   post:
 *     summary: Assign Secret Santa
 *     description: Assigns a Secret Santa to employees based on input CSV.
 *     responses:
 *       200:
 *         description: Assignment successful.
 *       500:
 *         description: Server error.
 */

router.post("/generate-secret-child", computeChild);

export default router;
