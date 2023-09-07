const React = require('react')

const Show = ({tweet}) => {
    return(
        <div>
            <div>{tweet.title}</div>
            <div>{tweet.author}</div>
            <div>{tweet.body}</div>
            <div>{new Date(tweet.createdAt).toISOString().slice(0, 16).replace('T', ' ')}</div> 
            {
                (tweet.comments.length > 0 ? tweet.comments.map(comment => {
                    return(
                        <div>
                            <p>{comment.body} by :{comment.author}</p>
                        </div>
                    )
                }) : <p>No comment yet. Post your comment below.</p>)
            }
            
                       
            <div>
                <form method="POST" action={`/api/tweets/add-comment/${tweet._id}?_method=PUT`}>
                    <h3>Comment</h3>
                    <label>Body:</label>
                    <input type="text" name="body" required/><br/>
                    <label>Author:</label>
                    <input type="text" name="author" required/><br/>
                    <input type="submit" value="Add Comment" />
                </form>
            </div>
        </div>
    )
}

module.exports = Show