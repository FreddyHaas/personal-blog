import { Link } from 'react-router-dom'
import { format, parseISO } from 'date-fns'

const MAX_CHARACTERS = 200


const Post = ({ title, text, date, id, readtime }) => {

    const shortenedText = `${text.slice(0, MAX_CHARACTERS)} ...`

    return (
        <div className='post'>
            <h2>{title}</h2>
            <p>{format(parseISO(date), 'dd LLL yyyy' )}     {readtime} min read</p>
            <p>{shortenedText}</p>
            <Link to={{
                pathname: `/home/posts/${id}`,
            }}>Read post</Link>
            
        </div>
    )
}

export default Post