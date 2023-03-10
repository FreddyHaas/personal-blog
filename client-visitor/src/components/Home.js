import { useState, useEffect } from "react"
import Header from "./Header"
import axios from "../api/axios"
import Post from "./Post"

const GETPOST_URL = "/posts"
const MAX_CHARACTERS = 200

function Home() {
    const [posts, setPosts] = useState()
    const [errMsg, setErrMsg] = useState()

    // Load posts
    async function loadPosts() {
        try {
            const response = await axios.get(GETPOST_URL)
            return response.data
        } catch (err) {
            return setErrMsg("Unable to load posts")
        }
    }

    // Store posts
    useEffect(() => {
        const storePosts = async () => {
            setPosts(await loadPosts())
        }
        storePosts()
    }, [])

    // Display posts
    const displayPosts = () => {
        const display = []

        if (posts !== undefined) {
            posts.forEach((post) => {
                const shortenedText = `${post.text.slice(
                    0,
                    MAX_CHARACTERS
                )} ...`

                if (post.published) {
                    display.push(
                        <Post
                            key={post._id}
                            id={post._id}
                            title={post.title}
                            text={shortenedText}
                            date={post.updatedAt}
                            readtime={post.readtime}
                            short
                        />
                    )
                }
            })
        }
        return display
    }

    const displayedPosts = displayPosts()

    return (
        <>
            <Header />
            <section className="post-container">
                <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
                {displayedPosts}
            </section>
        </>
    )
}

export default Home
