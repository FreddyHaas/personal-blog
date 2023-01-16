import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "./Header"
import useAuth from "../hooks/useAuth"
import axios from "../api/axios"

const CREATEPOST_URL = "/posts"

function PostForm() {
    const { auth } = useAuth()
    const navigate = useNavigate()

    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [published, setPublished] = useState(false)
    const [readtime, setReadtime] = useState("")
    const [errMsg, setErrMsg] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(
                CREATEPOST_URL,
                JSON.stringify({ title, text, readtime, published }),
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                }
            )
            console.log(response)
            setText("")
            setPublished("")
            setReadtime("")
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
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                    <textarea
                        id="text"
                        placeholder="Your blogtext goes here.."
                        onChange={(e) => setText(e.target.value)}
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
                            onChange={(e) => setReadtime(e.target.value)}
                        />
                        <span> min</span>
                    </label>
                    <label htmlFor="published">
                        Publish now
                        <input
                            type="checkbox"
                            id="published"
                            onChange={(e) =>
                                setPublished(
                                    e.target.checked ? "true" : "false"
                                )
                            }
                        />
                    </label>
                    <button type="submit" id="create-post-button">
                        Create post
                    </button>
                </form>
                <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
            </section>
        </>
    )
}

export default PostForm
