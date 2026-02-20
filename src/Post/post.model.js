'use strinct';
import e from 'cors';
import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'El título es obligatorio']
    },
    content: {
        type: String,
        required: [true, 'El contenido es obligatorio']
    },
    category: {
        type: String,
        required: [true, 'La categoría es obligatoria'],
        enum: ['TECNOLOGIA', 'SALUD', 'DEPORTES', 'ENTRETENIMIENTO', 'EDUCACION', 'NEGOCIOS', 'CIENCIA', 'VIAJES', 'MODA', 'GASTRONOMIA']
    },
    author: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    },
},
    {
        timestamps: true,
        versionKey: false
    }
)

PostSchema.index({status: 1});
PostSchema.index({category: 1});
export default mongoose.model('Post', PostSchema);