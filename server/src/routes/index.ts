import { Router } from "express";

const router = Router();

/**
 * @swagger
 * /secret-santa/assign:
 *   post:
 *     summary: Assign Secret Santa
 *     description: Assigns a Secret Santa to employees based on input CSV.
 *     responses:
 *       200:
 *         description: Assignment successful.
 *       500:
 *         description: Server error.
 */

router.get("/", (req, res) => {
  res.send("Server is running!");
});

export default router;
