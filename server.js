const express = require('express')
require('dotenv').config()
const connectDB = require('./utils/connectDB')
const jsxEngine = require('jsx-view-engine')
const Tweet = require("./models/tweet")
const manyTweets = require('./models/manyTweets')
const methodOverride = require('method-override')

//* Server config
const app = express()
const port = process.env.PORT || 3000

//* app config
app.set('view engine', 'jsx')
app.engine('jsx', jsxEngine()) 

//* Middleware
app.use((req, res, next) => {
    //console.log('from middleware', req.method, req.url)
    next();
})
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(methodOverride('_method'))


//* App Routes
app.get('/', (req, res) => {
    res.send('Working!!!')
})

//* fetch tweets
    //* views route
app.get('/tweets', async (req, res) => {
    try {
        const tweets = await Tweet.find({})
        //res.send(tweets)
        res.render('Index', {tweets})
    } catch (error) {
        console.log(error, 'No data found!')
    }
})
//* New tweet
app.get('/tweets/new', (req, res) => {
    res.render('New')
})
app.get('/tweets/:id/edit', async(req, res) => {
    const { id } = req.params
    try {
        const tweet = await Tweet.findById(id)
        res.render('Edit', { tweet})
    } catch (error) {
        console.log(error, 'tweet not updated')
    }
})
//* Show single tweet
app.get('/tweets/:id', async(req, res) => {
    const {id} = req.params
    try {
        const tweet = await Tweet.findById(id)
        res.render('Show', {tweet})
    } catch (error) {
        console.log(error, "Data not found!")
    }
})


//* API route
// =========== Create tweet ===================
app.post('/api/tweets', async(req, res) => {
    try {
        const tweet = req.body
        const newTweet = await Tweet.create(tweet)
        
        res.redirect('/tweets/')
    } catch (error) {
        console.log(error, "Data not created")
    }
})

// =========== Update tweet ===================
app.put('/api/tweets/:id', async(req, res) => {
    const { id } = req.params
    if(req.body.sponsored === 'one'){
        req.body.sponsored = true 
    } else {
        req.body.sponsored = false
    }
    try {
        
        const updatedTweet = await Tweet.findByIdAndUpdate(id, req.body,{new: true})
        res.send(updatedTweet)
        res.redirect(`/tweets/${id}`)
    } catch (error) {
        console.log(error, "Data not created")
    }
})


//* Seed route
// =============== Create tweets =====================
app.get('/api/tweets/seed', async(req, res) => {
    try {
        const createdTweets = await Tweet.insertMany(manyTweets)
        res.send(createdTweets)
    } catch (error) {
        console.log(error, 'Data not created.')
    }
})

//* Remove tweet
// ================== delete tweet ======================
app.delete('/api/tweets/:id', async(req, res)=> {
    const { id } = req.params
    try {
        const deletedTweet = await Tweet.findByIdAndDelete(id)
        res.redirect('/tweets')
    } catch (error) {
        console.log(error, "Tweet not found!")
    }
})

//* Add Comment 
app.put('/api/tweets/add-comment/:id', async(req, res)=> {
    const { id } = req.params
    try {
        const tweet = await Tweet.findById(id)
        
        tweet.comments.push(req.body)

        const updatedTweet = await Tweet.findByIdAndUpdate(id, tweet, {new: true})
        //res.send(updatedTweet)
        res.redirect('/tweets')
    } catch (error) {
        console.log(error, "Tweet not found!")
    }
})

//* Increase like numbers
app.get('/api/tweets/increase-like/:id', async(req, res)=> {
    const { id } = req.params
    
    try {
        const tweetToUpdate = await Tweet.findById(id)
        tweetToUpdate.likes++
        const updatedTweet = await Tweet.findByIdAndUpdate(id, tweetToUpdate,{new:true })

        res.redirect('/tweets')
    } catch (error) {
        console.log(error, "Tweet like not found, can't increase!")
    }
})
//* Database connection
connectDB()

//* App listening
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})