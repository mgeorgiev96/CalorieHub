const express = require('express')
const PORT = process.env.PORT || 5000
const app = express()
const path = require('path')
const privateRouter = require("./routes/private-routes")
const publicRouter = require("./routes/public-routes")
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const ejs = require('ejs')
const passport = require('passport')
const passportSetup = require('./config/passport-setup')


mongoose.connect(process.env.MONGO_DB,{ useUnifiedTopology: true , useNewUrlParser: true })


app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.set('view engine','ejs')
app.use(express.static(path.resolve(__dirname,'./static')))
app.use(express.static(path.resolve(__dirname,'./styles')))

app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: [process.env.SECRET_KEY]
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/',publicRouter)
app.use('/',privateRouter)

app.listen(PORT,()=>console.log(`Running in port:${PORT}.`))
