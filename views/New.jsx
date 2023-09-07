const React = require('react')
const DefaultLayout = require('./layout/default')

const New = () => {
    return(
        <DefaultLayout title="Create New Tweet">
            <h2>Create a new Tweet</h2>
            <form action="/api/tweets" method="POST">
                <label>Title</label>
                <input type="text" name="title" required/>
                <label>Author</label>
                <input type="text" name="author" required/>
                <label>Body</label>
                <textarea name="body" required></textarea>
                <input type="submit" value="post tweet"/>
            </form>
        </DefaultLayout>
    )
}

module.exports = New