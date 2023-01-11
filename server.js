require('dotenv').config()
const express = require('express')
require('./passport')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const postsRouter = require('./routes/posts')
const userRouter = require('./routes/user')

// Connect to database
mongoose.connect(process.env.DB_DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(passport.initialize())

app.use('/user', userRouter)
app.use('/posts', postsRouter)

app.listen(3000, () => console.log('Server started on port 3000'))