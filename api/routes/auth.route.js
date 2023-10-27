import express from "express";
import {
  google,
  signOut,
  signin,
  signup,
} from "../controllers/auth.controller.js";

// don't forget to add controller.js to prevent any errors in
// compilation

const router = express.Router();

// creating the router and calling api's from the controller
// folder respectively

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.get("/signout", signOut);

export default router;
