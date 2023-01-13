import { useState, useEffect } from 'react'
import Post from './Post'
import axios from '../api/axios'
const GETPOST_URL = '/posts'

const Posts = () => {
    const [posts, setPosts] = useState()
    const [errMsg, setErrMsg] = useState()    

    // Load posts
    async function loadPosts () {
        try {
            const response = await axios.get(GETPOST_URL) 
            return response.data
        } catch (err) {
            setErrMsg('Unable to load posts')
        }
    }

    // Store posts
    useEffect(() => {
        const storePosts = async () => {
            setPosts(await loadPosts())
        }
        storePosts()
    }, [])
    
    console.log(posts)

    const displayPosts = () => {
        const display = []
        
        if(posts !== undefined) {
            posts.map((post) => {
                display.push(
                    <Post
                    key={post._id}
                    id={post._id}
                    title={post.title}
                    text={post.text}
                    date={post.updatedAt}
                    />
                )
            })
        }

        return display
    }

    const displayedPosts = displayPosts()

    return (
        <>
            <section className='post-container'>
                <p className={errMsg ? 'errmsg' : 'offscreen'}>{errMsg}</p>
                    {displayedPosts} 
            </section>
        </>
    )
}

export default Posts