import Header from './Header'
import Post from './Post'
import PostComments from './PostComments'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from '../api/axios'

const PostDetail = () => {

    const { id } = useParams()

    const [post, setPost] = useState()
    const [errMsg, setErrMsg] = useState()

    // Load post 
    async function loadPosts () {
        try {
            const response = await axios.get(`/posts/${id}`) 
            return response.data
        } catch (err) {
            setErrMsg('Unable to load posts')
        }
    }

    // Store post
    useEffect(() => {
        const storePost = async () => {
            setPost(await loadPosts())
        }
        storePost()
    }, [])

    return (
        <>
            <Header />
            <section className='post-detail'>
                <p className={errMsg ? 'errmsg' : 'offscreen'}>{errMsg}</p>
                <Post
                    id={post?._id ? post._id : ''}
                    title={post?.title ? post.title : ''}
                    text={post?.text ? post.text : ''}
                    date={post?.updatedAt? post.updatedAt : ''}
                    readtime={post?.readtime? post.readtime : undefined}
                    short={false}
                />
                <PostComments
                    id={id}
                />
            </section>            
        </>
    )
}

export default PostDetail