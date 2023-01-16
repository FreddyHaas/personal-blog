function Comment({ name, text }) {
    return (
        <div className="comment">
            <p>{name}</p>
            <p>{text}</p>
        </div>
    )
}

export default Comment
