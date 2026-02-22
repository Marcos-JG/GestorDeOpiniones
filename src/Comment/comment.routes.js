import Router from "express";
import { createComment, updateMyComment, deleteMyComment, getCommentsByPost } from "./comment.controller.js";
import { validateJWT } from "../../middlewares/validate-JWT.js";
import { validateCreateComment, validateUpdateComment } from "../../middlewares/input-validator.js";
import multer from "multer";

const router = Router();
const upload = multer();

router.post(
    '/create',
    upload.none(),
    validateJWT,
    validateCreateComment,
    createComment
);

router.put(
    '/:id',
    upload.none(),
    validateJWT,
    validateUpdateComment,
    updateMyComment
);

router.delete(
    '/:id',
    validateJWT,
    deleteMyComment
);

router.get(
    '/post/:postId',
    validateJWT,
    getCommentsByPost
);

export default router;