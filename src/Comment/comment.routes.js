import Router from "express";
import { createComment } from "./comment.controller.js";
import { validateJWT } from "../../middlewares/validate-JWT.js";
import multer from "multer";

const router = Router();
const upload = multer();

router.post(
    '/create',
    upload.none(),
    validateJWT,
    createComment
);

export default router;