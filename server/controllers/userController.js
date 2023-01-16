const { body, validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")
const User = require("../models/user")
require("dotenv").config() // eslint-disable-line

// Sign up user
exports.signUp = [
    body(["email"], "Invalid email adresse").trim().isEmail().escape(),
    body(["password"], "Password must be provided")
        .trim()
        .isLength({ min: 1 })
        .escape(),

    (req, res) => {
        const errors = validationResult(req)

        const user = new User({
            email: req.body.email,
            password: req.body.password,
        })

        // Check if user already exists
        User.findOne({ email: req.body.email }).exec((err, foundEmail) => {
            if (err) {
                res.status(400).json({ err })
                return
            }

            // Return error if user already exists
            if (foundEmail) {
                res.status(409).json({ message: "User already exists" })
                return
            }

            // Handle input errors
            if (!errors.isEmpty()) {
                res.status(400).json({
                    user,
                    errors,
                })
            } else {
                // Save user information and login
                user.save((error) => {
                    if (error) {
                        res.status(400).json({ err })
                        return
                    }

                    req.login(user, { session: false }, (errLog) => {
                        if (errLog) {
                            res.status(400).json({ errLog })
                            return
                        }

                        const accessToken = jwt.sign(
                            { user },
                            process.env.ACCESS_TOKEN_SECRET
                        )
                        res.json({ accessToken })
                    })
                })
            }
        })
    },
]
