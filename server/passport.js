const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const User = require("./models/user")

passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        (email, password, done) => {
            User.findOne({ email }, (err, user) => {
                if (err) {
                    return done(err)
                }
                if (!user) {
                    return done(null, false, { message: "Incorrect username" })
                }
                if (password !== user.password) {
                    return done(null, false, { message: "Incorrect password" })
                }
                return done(null, user, { message: "Logged In Successfully" })
            })
        }
    )
)
