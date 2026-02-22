const VALID_CATEGORIES = [
    'TECNOLOGIA', 
    'SALUD', 
    'DEPORTES', 
    'ENTRETENIMIENTO', 
    'EDUCACION', 
    'NEGOCIOS', 
    'CIENCIA', 
    'VIAJES', 
    'MODA', 
    'GASTRONOMIA'
];

export const validateCreatePost = (req, res, next) => {
    const { title, content, category } = req.body;
    const errors = [];

    if (!title || title.trim() === '') {
        errors.push('El título es obligatorio');
    } else if (title.length < 5) {
        errors.push('El título debe tener al menos 5 caracteres');
    } else if (title.length > 200) {
        errors.push('El título no puede exceder 200 caracteres');
    }

    if (!content || content.trim() === '') {
        errors.push('El contenido es obligatorio');
    } else if (content.length < 10) {
        errors.push('El contenido debe tener al menos 10 caracteres');
    } else if (content.length > 5000) {
        errors.push('El contenido no puede exceder 5000 caracteres');
    }

    if (!category) {
        errors.push('La categoría es obligatoria');
    } else if (!VALID_CATEGORIES.includes(category)) {
        errors.push(`La categoría debe ser una de: ${VALID_CATEGORIES.join(', ')}`);
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Errores de validación',
            errors
        });
    }

    req.body.title = title.trim();
    req.body.content = content.trim();
    req.body.category = category.trim().toUpperCase();

    next();
};

export const validateUpdatePost = (req, res, next) => {
    const { title, content, category } = req.body;
    const errors = [];

    if (!title && !content && !category) {
        return res.status(400).json({
            success: false,
            message: 'Debe proporcionar al menos un campo para actualizar (title, content o category)'
        });
    }

    if (title !== undefined) {
        if (title.trim() === '') {
            errors.push('El título no puede estar vacío');
        } else if (title.length < 5) {
            errors.push('El título debe tener al menos 5 caracteres');
        } else if (title.length > 200) {
            errors.push('El título no puede exceder 200 caracteres');
        } else {
            req.body.title = title.trim();
        }
    }

    if (content !== undefined) {
        if (content.trim() === '') {
            errors.push('El contenido no puede estar vacío');
        } else if (content.length < 10) {
            errors.push('El contenido debe tener al menos 10 caracteres');
        } else if (content.length > 5000) {
            errors.push('El contenido no puede exceder 5000 caracteres');
        } else {
            req.body.content = content.trim();
        }
    }

    if (category !== undefined) {
        const upperCategory = category.trim().toUpperCase();
        if (!VALID_CATEGORIES.includes(upperCategory)) {
            errors.push(`La categoría debe ser una de: ${VALID_CATEGORIES.join(', ')}`);
        } else {
            req.body.category = upperCategory;
        }
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Errores de validación',
            errors
        });
    }

    next();
};

export const validateCreateComment = (req, res, next) => {
    const { content, post } = req.body;
    const errors = [];

    if (!content || content.trim() === '') {
        errors.push('El contenido del comentario es obligatorio');
    } else if (content.length < 3) {
        errors.push('El comentario debe tener al menos 3 caracteres');
    } else if (content.length > 1000) {
        errors.push('El comentario no puede exceder 1000 caracteres');
    }

    if (!post || post.trim() === '') {
        errors.push('El ID de la publicación es obligatorio');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Errores de validación',
            errors
        });
    }

    req.body.content = content.trim();

    next();
};

export const validateUpdateComment = (req, res, next) => {
    const { content } = req.body;
    const errors = [];

    if (!content) {
        return res.status(400).json({
            success: false,
            message: 'El contenido es obligatorio para actualizar el comentario'
        });
    }

    if (content.trim() === '') {
        errors.push('El contenido del comentario no puede estar vacío');
    } else if (content.length < 3) {
        errors.push('El comentario debe tener al menos 3 caracteres');
    } else if (content.length > 1000) {
        errors.push('El comentario no puede exceder 1000 caracteres');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Errores de validación',
            errors
        });
    }
    req.body.content = content.trim();

    next();
};

