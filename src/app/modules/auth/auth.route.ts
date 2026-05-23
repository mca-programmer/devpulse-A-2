import { Router } from "express";
import {
  login,
  registerUser,
} from "./auth.controller";

const router = Router();

router.post("/signup", registerUser);
router.post("/login", login);

export const AuthRoutes = router;   