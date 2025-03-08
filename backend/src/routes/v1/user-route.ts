import { Router } from "express";
import {
  getAllUsers,
  createUser,
  deleteUserById,
  editUser,
} from "../../controllers/user-controller.js";

const router = Router();

router.get("/", getAllUsers);
router.post("/", createUser);
router.delete("/:id", deleteUserById);
router.post("/:id", editUser);

export default router;
