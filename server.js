require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const postsRouter = require('./routes/posts')
const usersRouter = require('./routes/users')

// Connect to database
mongoose.connect(process.env.DB_DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())
app.use('/posts', postsRouter)
app.use('/users', usersRouter)

app.listen(3000, () => console.log('Server started on port 3000'))