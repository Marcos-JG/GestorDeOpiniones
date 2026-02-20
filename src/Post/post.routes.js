import { Router } from "express";
import { createPost, getMyPosts, getAllPosts } from "./post.controller.js";
import multer from "multer";
import { validateJWT } from "../../middlewares/validate-JWT.js";

const router = Router();
const upload = multer();

router.post(
    '/create',
    upload.none(),
    validateJWT,
    createPost
);

router.get(
    '/all',
    validateJWT,
    getAllPosts
);

router.get(
    '/',
    validateJWT,
    getMyPosts
);



export default router;