import { Router } from "express";
import {
  getAllUsers,
  createUser,
  deleteUserById,
} from "../../controllers/user-controller.js";

const router = Router();

router.get("/", getAllUsers);
router.post("/", createUser);
router.delete("/:id", deleteUserById);

export default router;
