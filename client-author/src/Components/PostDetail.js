import { useParams } from 'react-router-dom'

const PostDetail = () => {

    const { id } = useParams()
    console.log(id);

    return (
        <h1>NOT IMPLEMENTED: Post detail</h1>
    )
}

export default PostDetail