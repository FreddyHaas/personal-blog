import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import Header from "./Header"
import useAuth from "../hooks/useAuth"
import axios from "../api/axios"

function PostEdit() {
    const { id } = useParams()

    const { auth } = useAuth()
    const navigate = useNavigate()

    const [post, setPost] = useState("")
    const [errMsg, setErrMsg] = useState("")

    // Load post
    async function loadPosts() {
        try {
            const response = await axios.get(`/posts/${id}`)
            return response.data
        } catch (err) {
            return setErrMsg("Unable to load posts")
        }
    }

    // Store post
    useEffect(() => {
        const storePost = async () => {
            setPost(await loadPosts())
        }
        storePost()
    }, [])

    // Submit updated post
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { title, text, readtime, published } = post
            const response = await axios.post(
                `/posts/${id}`,
                JSON.stringify({ title, text, readtime, published }),
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                }
            )
            console.log(response)
            setPost("")
            navigate("/home")
        } catch (err) {
            if (!err?.response) {
                setErrMsg("No server resonse")
            } else {
                setErrMsg("Creation of blogpost failed")
            }
        }
    }

    // Delete post
    const handleDelete = async () => {
        try {
            const response = await axios.delete(`/posts/${id}`, {
                headers: { Authorization: `Bearer ${auth.accessToken}` },
            })
            console.log(response)
            setPost("")
            navigate("/home")
        } catch (err) {
            if (!err?.response) {
                setErrMsg("No server resonse")
            } else {
                console.log(err)
                setErrMsg("Creation of blogpost failed")
            }
        }
    }

    return (
        <>
            <Header />
            <section className="create-post">
                <h1>New Post</h1>
                <form onSubmit={handleSubmit} className="create-post-form">
                    <input
                        type="text"
                        id="title"
                        placeholder="Title"
                        onChange={(e) =>
                            setPost({ ...post, title: e.target.value })
                        }
                        defaultValue={post.title}
                    />
                    <textarea
                        id="text"
                        placeholder="Your blogtext goes here.."
                        onChange={(e) =>
                            setPost({ ...post, text: e.target.value })
                        }
                        defaultValue={post.text}
                    />
                    <label htmlFor="readtime">
                        Read in
                        <input
                            type="number"
                            placeholder="5"
                            min="0"
                            max="120"
                            step="1"
                            id="readtime"
                            onChange={(e) =>
                                setPost({ ...post, readtime: e.target.value })
                            }
                            defaultValue={post.readtime}
                        />
                        <span> min</span>
                    </label>
                    <label htmlFor="published">
                        Publish now
                        <input
                            type="checkbox"
                            id="published"
                            onChange={(e) =>
                                setPost({
                                    ...post,
                                    published: !!e.target.checked,
                                })
                            }
                            checked={!!post.published}
                        />
                    </label>
                    <button type="submit" id="create-post-button">
                        Save changes
                    </button>
                </form>
                <button
                    type="button"
                    onClick={handleDelete}
                    id="delete-post-button"
                >
                    Delete
                </button>
                <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
            </section>
        </>
    )
}

export default PostEdit
