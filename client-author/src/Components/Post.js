import { Link } from 'react-router-dom'
import { format, parseISO } from 'date-fns'

const Post = ({ title, text, date, id, readtime, published }) => {

    return (
        <div className='post'>
            <h2>{title}</h2>
            <p>{format(parseISO(date), 'dd-LLL-yyyy' )}    {readtime} min read     {(published) ? 'Published' : 'Not published'}</p>
            <p>{text}</p>
            <Link to={{
                pathname: `/home/posts/${id}`,
            }}>Edit post</Link>
        </div>
    )
}

export default Post