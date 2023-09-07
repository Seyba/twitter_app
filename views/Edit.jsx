const React = require('react')
const DefaultLayout = require('./layout/default')

const Edit = ({tweet}) => {
    return(
        <DefaultLayout title="Edit You Tweet">
            <form action={`/api/tweets/${tweet._id}?_method=PUT`} method="POST">

                Title: <input type="text" name="title" defaultValue={tweet.title} required/>

                <textarea name="body" defaultValue={tweet.body} required></textarea>

                <input type="checkbox" name="sponsored" defaultChecked={tweet.sponsored} />

                <input type="submit" value="Update"/>
            </form>
        </DefaultLayout>
    )
}

module.exports = Edit