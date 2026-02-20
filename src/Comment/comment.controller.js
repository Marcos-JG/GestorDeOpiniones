import Comment from "./Comment.Model.js";

export const createComment = async (req, res) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({
                success: false,
                message: 'No autorizado: falta el usuario del token'
            });
        }

        const commentData = {
            ...req.body,
            author: req.user.id
        };
        const comment = new Comment(commentData);
        await comment.save();
        res.status(201).json({
            success: true,
            message: 'Comentario creado exitosamente',
            data: comment
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al crear el comentario',
            error: error.message
        });
    }
}