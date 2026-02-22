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

export const updateMyComment = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findById(id);
        
        if (!comment) {
            return res.status(404).json({
                success: false,
                message: 'Comentario no encontrado'
            });
        }
        
        if (comment.author !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'No tienes permiso para editar este comentario'
            });
        }
        
        const { content } = req.body;
        if (!content) {
            return res.status(400).json({
                success: false,
                message: 'El contenido es requerido'
            });
        }
        
        comment.content = content;
        await comment.save();
        
        res.status(200).json({
            success: true,
            message: 'Comentario actualizado exitosamente',
            data: comment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el comentario',
            error: error.message
        });
    }
}

export const deleteMyComment = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findById(id);
        
        if (!comment) {
            return res.status(404).json({
                success: false,
                message: 'Comentario no encontrado'
            });
        }
        
        if (comment.author !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'No tienes permiso para eliminar este comentario'
            });
        }
        await Comment.findByIdAndDelete(id);
        
        res.status(200).json({
            success: true,
            message: 'Comentario eliminado exitosamente',
            data: comment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el comentario',
            error: error.message
        });
    }
}

export const getCommentsByPost = async (req, res) => {
    try {
        const { postId } = req.params;
        
        const comments = await Comment.find({ 
            post: postId,
            status: true 
        }).sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            message: 'Comentarios obtenidos exitosamente',
            count: comments.length,
            data: comments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los comentarios',
            error: error.message
        });
    }
}