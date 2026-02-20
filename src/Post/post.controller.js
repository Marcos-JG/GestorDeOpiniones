import Post from "./post.model.js";

export const createPost = async (req, res) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({
                success: false,
                message: 'No autorizado: falta el usuario del token'
            });
        }

        const postData = {
            ...req.body,
            author: req.user.id
        };
        const post = new Post(postData);
        await post.save();
        res.status(201).json({
            success: true,
            message: 'Publicación creada exitosamente',
            data: post
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al crear la publicación',
            error: error.message
        });
    }
};

export const getAllPosts = async (req, res) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({
                success: false,
                message: 'No autorizado: falta el usuario del token'
            });
        }

        const { page = 1, limit = 10, status = true } = req.query;
        const filter = { status };
        const options = {
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
            sort: { createdAt: -1 }
        };

        const posts = await Post.find(filter)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort(options.sort);

        const total = await Post.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: posts,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalRecords: total,
                limit
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener las publicaciones',
            error: error.message
        });
    }
};

export const getMyPosts = async (req, res) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({
                success: false,
                message: 'No autorizado: falta el usuario del token'
            });
        }

        const { page = 1, limit = 10, status = true } = req.query;
        const filter = { status, author: req.user.id };
        const options = {
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
            sort: { createdAt: -1 }
        };

        const posts = await Post.find(filter)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort(options.sort);

        const total = await Post.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: posts,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalRecords: total,
                limit
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener las publicaciones',
            error: error.message
        });
    }
};