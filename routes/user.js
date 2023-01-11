const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const passport = require('passport')
require('dotenv').config()
const userController = require('../controllers/userController')

// POST: sign up
router.post('/signup', userController.signUp)

// POST: login
router.post('/login', (req, res) => {
    
    // Authenticate user
    passport.authenticate('local', { session: false }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Not possible to login',
                user: user
            })
        }
        // Create JSON Webtoken
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
        res.json({ accessToken: accessToken })
    })
})

module.exports = router