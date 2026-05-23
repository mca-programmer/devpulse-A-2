import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { IssueRoutes } from "../modules/issue/issue.route";

const router = Router();

/**
 * Health Check 
 */
router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "DevPulse API is running",
  });
});

/**
 * Auth Module Routes
 */
router.use("/auth", AuthRoutes);

/**
 * Issue Module Routes
 */
router.use("/issues", IssueRoutes);

export default router;