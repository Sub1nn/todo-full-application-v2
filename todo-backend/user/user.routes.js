import { Router } from "express";
import {
  loginUser,
  registerUser,
  validateNewUser,
  validateUserEmail,
} from "./user.service.js";

const router = Router();

// register a user
router.post("/user/register", validateNewUser, registerUser);

// user login
router.post("/user/login", validateUserEmail, loginUser);

export default router;
