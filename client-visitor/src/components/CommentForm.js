import { useState } from "react"
import axios from "../api/axios"

function CommentForm({ id, addCommentToState }) {
    const [name, setName] = useState("")
    const [comment, setComment] = useState("")
    const [errMsg, setErrMsg] = useState("")

    // Submit new comment
    const addComment = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(
                `/posts/${id}/comments`,
                JSON.stringify({ name, text: comment, post: id }),
                {
                    headers: { "Content-Type": "application/json" },
                }
            )
            addCommentToState(response.data)
            setName("")
            setComment("")
        } catch (err) {
            if (!err?.response) {
                setErrMsg("No server resonse")
            } else {
                setErrMsg("Creation of comment failed")
            }
        }
    }

    return (
        <>
            <h3>Add comment</h3>
            <form className="add-comment" onSubmit={addComment}>
                <label htmlFor="name">Name: </label>
                <input
                    type="text"
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <label htmlFor="comment">Comment: </label>
                <textarea
                    type="text"
                    id="comment"
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                />
                <button type="submit">Add</button>
                <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
            </form>
        </>
    )
}

export default CommentForm
