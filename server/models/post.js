const mongoose = require('mongoose')
const { DateTime } = require('luxon')

const PostSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, maxLength: 100 },
        text: { type: String, required: true },
        published: { type: Boolean, default: false },
        readtime: { type: Number },
    }, 
    {
        timestamps: true,
    },
    {
        getters: true
    }
)

// Format timestamps

PostSchema.virtual('date').get(function () {
    return DateTime.fromJSDate(this.updatedAt).toFormat('dd LLL yy')
})

module.exports = mongoose.model('Post', PostSchema)