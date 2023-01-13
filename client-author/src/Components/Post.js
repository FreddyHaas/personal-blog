import { Link } from 'react-router-dom'
import { format, parseISO } from 'date-fns'

const Post = ({ title, text, date, id }) => {

    return (
        <div className='post'>
            <h2>{title}</h2>
            <p>Last updated: {format(parseISO(date), 'dd/mm/yyyy')}</p>
            <p>{text}</p>
            <Link to={{
                pathname: `/home/posts/${id}`,
            }}>Edit post</Link>
        </div>
    )
}

export default Post