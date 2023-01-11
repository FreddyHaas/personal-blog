const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const passport = require('passport')
require('dotenv').config()
const userController = require('../controllers/userController')

// POST: sign up
router.post('/signup', userController.signUp)

// POST: login
router.post('/login', function (req, res, next) {
    // Authenticate user
    passport.authenticate('local', { session: false }, (err, user, next) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Not possible to login',
                user: user
            })
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err)
            }
            // Create JSON Webtoken
            const accessToken = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
            res.json({ accessToken: accessToken })
        })
    })(req, res)
})

module.exports = router