import Header from './Header'
import axios from '../api/axios'
import Post from './Post'
import { useState, useEffect } from 'react'

const GETPOST_URL = '/posts'

const Home = () => {
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
                posts.forEach((post) => {
                    if(post.published) {
                        display.push(
                            <Post
                            key={post._id}
                            id={post._id}
                            title={post.title}
                            text={post.text}
                            date={post.updatedAt}
                            readtime={post.readtime}
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
            <section className='post-container'>
                    <p className={errMsg ? 'errmsg' : 'offscreen'}>{errMsg}</p>
                        {displayedPosts} 
            </section>
        </>
    )
}

export default Home