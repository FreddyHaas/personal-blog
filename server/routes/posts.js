const express = require("express")
const router = express.Router()
const postController = require("../controllers/postController")

// GET: display all posts
router.get("/", postController.displayAllPosts)

// GET: display individual post
router.get("/:id", postController.displayOnePost)

// POST: add a new post
router.post("/", postController.addPost)

// UPDATE: update an existing post
router.post("/:id", postController.updatePost)

// DELETE: delete an existing post
router.delete("/:id", postController.deletePost)

// GET: display all comments for a post
router.get("/:id/comments", postController.displayAllComments)

// POST: add new comment to a post
router.post("/:id/comments", postController.addComment)

// DELETE: delete a comment to a post
router.delete("/comments/:id", postController.deleteComment)

module.exports = router
