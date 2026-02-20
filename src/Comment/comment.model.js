'use strict';
import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'El contenido del comentario es obligatorio']
    },
    author: {
        type: String
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: [true, 'La publicación del comentario es obligatoria']
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

CommentSchema.index({ status: 1 });
CommentSchema.index({ post: 1 });
export default mongoose.model('Comment', CommentSchema);
