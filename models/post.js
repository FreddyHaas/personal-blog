const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, maxLength: 100 },
        text: { type: String, required: true },
        published: { type: Boolean, default: false },
        readtime: { type: Number },
    }, 
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Post', PostSchema)