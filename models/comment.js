const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, maxLength: 100 },
        text: { type: String, required: true, maxLength: 500 },
        post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Comment', CommentSchema)