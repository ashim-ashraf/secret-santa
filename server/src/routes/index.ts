import { Router } from "express";
import { computeChild } from "../controllers/generate-child";
const router = Router();

/**
 * @swagger
 * /api/v1/generate-secret-child:
 *   post:
 *     summary: Assign Secret Santa
 *     description: Processes employee lists and assigns Secret Santa pairs based on input CSV files.
 *     tags:
 *       - Secret Santa
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               employeeList:
 *                 type: string
 *                 format: binary
 *                 description: CSV file containing the list of employees.
 *               previousYearList:
 *                 type: string
 *                 format: binary
 *                 description: (Optional) CSV file containing last year's assignments to avoid repeats.
 *     responses:
 *       200:
 *         description: Secret Santa assignments successfully generated.
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *               example: |
 *                 Employee Name,Employee Email,Secret Child Name,Secret Child Email
 *                 Alice,alice@acme.com,Bob,bob@acme.com
 *       400:
 *         description: Bad request due to missing or invalid CSV data.
 *       500:
 *         description: Internal server error.
 */

router.post("/generate-secret-child", computeChild);

export default router;
