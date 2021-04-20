const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const User = require('../models/model')

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser((id,done)=>{
    User.findById(id).then(user=>{
        done(null,user)
    })
})

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.REDIRECT_URL
},(accessToken,refreshToken,profile,done)=>{
    let date = new Date()
    User.findOne({username:profile._json.email}).then(user=>{
        if(user){
            done(null,user)
        }else{
            new User({
                username: profile._json.email,
                password: profile.id,
                name: profile._json.name,
                favourites: [],
                meals: [],
                personal: {
                    meals: 0,
                    weight: 0,
                    goalWeight: 0,
                    calories: 0,
                    protein: 0,
                    carbs: 0,
                    fat: 0,
                    water: 0,
                    consumedCalories: 0,
                    consumedProtein: 0,
                    consumedCarbs: 0,
                    consumedFat: 0,
                    consumedWater: 0
                },
                dayData:{month:date.getMonth(),day:date.getDate()}
            }).save().then(()=>done(null,user)).catch(err=>console.log(err))
        }
    }).catch(err=>console.log(err))
}))