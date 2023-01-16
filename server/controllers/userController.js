const User = require("../models/user")
const { body, validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")
require("dotenv").config()

// Sign up user
exports.signUp = [
    body(["email"], "Invalid email adresse").trim().isEmail().escape(),
    body(["password"], "Password must be provided")
        .trim()
        .isLength({ min: 1 })
        .escape(),

    (req, res, next) => {
        const errors = validationResult(req)

        const user = new User({
            email: req.body.email,
            password: req.body.password,
        })

        // Check if user already exists
        User.findOne({ email: req.body.email }).exec((err, found_email) => {
            if (err) {
                console.log(err)
                res.status(400).json({ err })
                return
            }

            // Return error if user already exists
            if (found_email) {
                res.status(409).json({ message: "User already exists" })
                return
            }

            // Handle input errors
            if (!errors.isEmpty()) {
                res.status(400).json({
                    user,
                    errors,
                })
                return
            } else {
                // Save user information and login
                user.save((err) => {
                    if (err) {
                        res.status(400).json({ err })
                        return
                    }

                    req.login(user, { session: false }, (err) => {
                        if (err) {
                            res.status(400).json({ err })
                            return
                        }

                        const accessToken = jwt.sign(
                            { user },
                            process.env.ACCESS_TOKEN_SECRET
                        )
                        res.json({ accessToken: accessToken })
                    })
                })
            }
        })
    },
]
