const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('./models/user')

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
    },
    function (email, password, cb) {
        return User.findOne({ email, password }, (err, user) => {
            if (err) {
                return done (err)
            }
            if (!user) {
                return done(null, false, { message: 'Incorrect username' })
            }
            if (password != user.password)  {
                return done(null, false, { message: 'Incorrect password' })
            }

            return done(null, user, { message: 'Logged In Successfully'})
        })
    }

))