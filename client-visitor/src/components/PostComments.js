import { useState, useEffect } from "react"
import Comment from "./Comment"
import CommentForm from "./CommentForm"
import axios from "../api/axios"

function PostComments({ id }) {
    const [comments, setComments] = useState()
    const [errMsg, setErrMsg] = useState()

    // Load comments
    async function loadComments() {
        try {
            const response = await axios.get(`/posts/${id}/comments`)
            return response.data
        } catch (err) {
            return setErrMsg("Unable to load posts")
        }
    }

    // Store comments
    useEffect(() => {
        const storeComments = async () => {
            setComments(await loadComments())
        }
        storeComments()
    }, [])

    // Display comments
    const displayComments = () => {
        const display = []

        if (comments !== undefined) {
            comments.forEach((comment) => {
                display.push(
                    <Comment
                        key={comment._id}
                        name={comment.name}
                        text={comment.text}
                    />
                )
            })
        }
        return display
    }

    const displayedComments = displayComments()

    // Function to update comments after adding new comment
    const addCommentToState = (newComment) => {
        setComments([...comments, newComment])
    }

    return (
        <>
            <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
            <CommentForm id={id} addCommentToState={addCommentToState} />
            <div className="comments">
                <h3>Comments</h3>
                {displayedComments.length === 0 ? (
                    <p id="no-comments">No comments yet</p>
                ) : (
                    displayedComments
                )}
            </div>
        </>
    )
}

export default PostComments
