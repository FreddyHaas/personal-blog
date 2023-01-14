import { useState, useEffect } from 'react'
import Comment from './Comment'
import CommentForm from './CommentForm'
import axios from '../api/axios'

const PostComments = ({ id }) => {
    const [comments, setComments] = useState()
    const [errMsg, setErrMsg] = useState()  


    // Load comments 
    async function loadComments () {
        try {
            const response = await axios.get(`/posts/${id}/comments`)
            return response.data
        } catch (err) {
            setErrMsg('Unable to load posts')
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

            console.log(comments)

            comments.forEach(comment => {
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
        setComments([newComment, ...comments])
        return
    }


    return (
        <>
            <section className='post-container'>
                <p className={errMsg ? 'errmsg' : 'offscreen'}>{errMsg}</p>
                <CommentForm 
                    id={id}
                    addCommentToState={addCommentToState}
                />    
                {displayedComments} 
            </section>
        </>
    )

}

export default PostComments