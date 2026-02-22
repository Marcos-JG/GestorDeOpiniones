import { Router } from "express";
import { createPost, getMyPosts, getAllPosts, getPostById, updateMyPost, deleteMyPost } from "./post.controller.js";
import multer from "multer";
import { validateJWT } from "../../middlewares/validate-JWT.js";
import { validateCreatePost, validateUpdatePost } from "../../middlewares/input-validator.js";

const router = Router();
const upload = multer();

router.post(
    '/create',
    upload.none(),
    validateJWT,
    validateCreatePost,
    createPost
);

router.get(
    '/all',
    validateJWT,
    getAllPosts
);

router.get(
    '/:id',
    validateJWT,
    getPostById
);

router.get(
    '/',
    validateJWT,
    getMyPosts
);

router.put(
    '/:id',
    upload.none(),
    validateJWT,
    validateUpdatePost,
    updateMyPost
);

router.delete(
    '/:id',
    validateJWT,
    deleteMyPost
);

export default router;