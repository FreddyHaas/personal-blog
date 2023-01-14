const Post = require('../models/post')
const Comment = require('../models/comment')
const { body, validationResult } = require('express-validator')
require('dotenv').config()
const jwt = require('jsonwebtoken')

// Display all posts
exports.displayAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ updatedAt: -1 })
        res.json(posts)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// Display one post
exports.displayOnePost = [ 
    getPost, 
    (req, res) => { res.json(res.post)}
]

// Add new post
exports.addPost = [
    authenticateToken,
    body(['title'], 'Title must be specified').trim().isLength({ min: 1 }).escape(),
    body(['text'], 'Text must be specified').trim().isLength({ min: 1 }).escape(),
    body(['readtime'], 'Readtime must be specified').isInt().escape(),
    
    async (req, res) => {

        const errors = validationResult(req) 

        if(!errors.isEmpty()) {
            res.status(400).json({
                post: req.body,
                errors: errors.array()
            })
            return
        }

        const post = new Post ({
            title: req.body.title,
            text: req.body.text,
            readtime: req.body.readtime,
            published: req.body.published,
        })

        try {
            const newPost = await post.save()
            res.status(201).json(newPost)
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    }
]

// Update existing post
exports.updatePost = [
    authenticateToken,
    body(['title'], 'Title must be specified').trim().isLength({ min: 1 }).escape(),
    body(['text'], 'Text must be specified').trim().isLength({ min: 1 }).escape(),
    body(['readtime'], 'Readtime must be specified').isInt().escape(),

    async (req, res) => {

        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            res.status(400).json({
                post: req.body,
                errors: errors.array()
            })
            return
        }

        const post = new Post ({
            _id: req.params.id,
            title: req.body.title,
            text: req.body.text,
            readtime: req.body.readtime,
            published: req.body.published,
        })

        try {
            const updatedPost = await Post.findByIdAndUpdate(req.body.id, post)
            res.status(201).json(updatedPost)
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    }
]

// Delete post
exports.deletePost = [
    authenticateToken,
    getPost, 
    async (req, res) => {
    try {
        await res.post.remove()
        res.status(200).json({ message: 'Post deleted' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}]

// Display all comments for a post
exports.displayAllComments = async (req, res) => {
    try {
        const comments = await Comment.find({ post: req.params.id }).sort({ updatedAt: 1 })
        res.json(comments)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

// Add a new comment
exports.addComment = [
    body(['name'], 'Name must be specified').trim().isLength({ min: 1 }).escape(),
    body(['text'], 'Text must be specified').trim().isLength({ min: 1 }).escape(),

    async (req, res) => {
        
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            res.status(400).json({
                comment: req.body,
                errors: errors.array()
            })
            return
        }

        const comment = new Comment ({
            name: req.body.name, 
            text: req.body.text,
            post: req.params.id,
        })

        try {
            const newComment = await comment.save()
            res.status(201).json(newComment)
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    }
]

// Delete a comment
exports.deleteComment = [
    authenticateToken, 
    async (req, res) => {
        try {
            await Comment.findByIdAndRemove(req.params.id)
            res.status(200).json({ message: 'Comment deleted' })
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }
]

// ADDITIONAL MIDDLEWARE FUNCTIONS

// Get post from id
async function getPost (req, res, next) {
    let post 
    try {
        post = await Post.findById(req.params.id)
        if (post == null) {
            return res.status(404).json({ message: 'Cannot find post' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.post = post 
    next()
}

// Check if user is authorized to access resource

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        console.log(err)
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}