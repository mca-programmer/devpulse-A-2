import { Router } from "express";
import {
  createIssueController,
  deleteIssueController,
  getAllIssuesController,
  getSingleIssueController,
  updateIssueController,
} from "./issue.controller";

import { auth } from "../../middleware/auth";
import { checkRole } from "../../middleware/checkRole";

const router = Router();

/**
 * Public Routes
 */
router.get("/", getAllIssuesController);
router.get("/:id", getSingleIssueController);

/**
 * Protected Routes
 */
router.post("/", auth, createIssueController);

router.patch(
  "/:id",
  auth,
  updateIssueController
);

/**
 * Maintainer Only
 */
router.delete(
  "/:id",
  auth,
  checkRole("maintainer"),
  deleteIssueController
);

export const IssueRoutes = router;