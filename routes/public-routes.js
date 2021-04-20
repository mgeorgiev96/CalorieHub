const router = require('express').Router()
const path = require("path")
const User = require('../models/model')
const bcrypt = require('bcrypt')
const passport = require('passport')



router.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../static/index.html'))
})
router.get('/calculator',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../static/index.html'))
})

router.post('/create-account',(req,res)=>{
    let date = new Date()
    User.findOne({username:req.body.username}).then(user=>{
        if(user){
            res.redirect('/email-used')
        }else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                new User({
                    username: req.body.username,
                    password: hash,
                    name: req.body.name,
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
                }).save().then(()=>res.redirect('/')).catch(err=>console.log(err))
            })
        }
    }).catch(err=>console.log(err))
})


router.get('/logout',(req,res)=>{
    req.session.user=null
    res.redirect('/')

})
router.post('/login',(req,res)=>{
    let date = new Date()
    User.findOne({username:req.body.username}).then(user=>{
        if(user){
            bcrypt.compare(req.body.password,user.password,(err,result)=>{
                if(result){
                    if(user.dayData.day === date.getDate() && user.dayData.month === date.getMonth()){
                        req.session.user={
                            username: user.username,
                            name: user.name,
                            favourites: user.favourites,
                            meals: user.meals,
                            personal: user.personal,
                            dayData: user.dayData
                        }
                        res.redirect('/calculator')
                    }else{
                        User.update({username: req.body.username},{
                            $set: {dayData: {month:date.getMonth(),day:date.getDate()}}
                        }).then(i=>{
                            let personalData = user.personal
                            personalData.consumedCalories = 0
                            personalData.consumedProtein = 0
                            personalData.consumedCarbs = 0
                            personalData.consumedFat = 0
                            personalData.consumedWater = 0
                            User.update({username: req.body.username},{
                                $set: {personal: personalData}
                            }).catch(err=>console.log(err))
                        }).then(()=>{
                            User.findOne({username:req.body.username}).then(i=>{
                                req.session.user={
                                    username: i.username,
                                    name: i.name,
                                    favourites: i.favourites,
                                    meals: i.meals,
                                    personal: i.personal,
                                    dayData: i.dayData
                                }
                                res.redirect('/calculator')
                            })
                        }).catch(err=>console.log(err))
                    }
                }else{
                    res.redirect('/wrong-password')
                }
            })
        }else{
            res.redirect('/wrong-username')
        }
    }).catch(err=>console.log(err))
})

router.post('/save-favourite',(req,res)=>{
    User.update({username:req.session.user.username},{
        $push: {favourites:{...req.body.favourite}}
    }).then(()=>{
        User.findOne({username:req.session.user.username}).then(user=>{
            res.send({
                username: user.username,
                name: user.name,
                favourites: user.favourites,
                meals: user.meals,
                personal: user.personal,
                dayData: user.dayData
            })
        })
    }).catch(err=>console.log(err))
})

router.post('/remove-favourite',(req,res)=>{
    User.update({username:req.session.user.username},{
        $pull: {favourites:{id:req.body.id}}
    }).then(()=>res.send('complete')).catch(err=>console.log(err))
})

router.post('/edit-personal',(req,res)=>{
    let personal = ''
    User.findOne({username:req.session.user.username}).then(i=>{
        personal = i.personal
        personal[req.body.type] = parseInt(req.body.value)
    }).then(()=>{
        User.update({username:req.session.user.username},{
            $set: {personal:personal}
        }).then(()=>res.send('complete')).catch(err=>console.log(err))
    }).catch(err=>console.log(err))
})

router.post('/save-water',(req,res)=>{
    let personalData = ''
    User.findOne({username:req.session.user.username}).then(i=>{
        personalData = i.personal
        personalData.consumedWater += req.body.water
        User.update({username:req.session.user.username},{
            $set: {personal:personalData}
        }).then(()=>{
            User.findOne({username:req.session.user.username}).then(user=>{
                res.send({
                    username: user.username,
                    name: user.name,
                    favourites: user.favourites,
                    meals: user.meals,
                    personal: user.personal,
                    dayData: user.dayData
                })
            })
        }).catch(err=>console.log(err))
    })
})


router.get('/wrong-password',(req,res)=>{
    res.render('wrong-password')
})
router.get('/wrong-username',(req,res)=>{
    res.render('wrong-username')
})
router.get('/email-used',(req,res)=>{
    res.render('invalid')
})

router.get('/api/google',passport.authenticate('google',{
    scope: ['https://www.googleapis.com/auth/plus.login','email'],
    prompt: ['select_account']
}))

router.get('/api/google/redirect',passport.authenticate('google'),(req,res)=>{
    req.session.user = req.user
    let date = new Date()
    User.findOne({username:req.user.username}).then(user=>{
        if(user.dayData.day === date.getDate() && user.dayData.month === date.getMonth()){
            req.session.user={
                username: user.username,
                name: user.name,
                favourites: user.favourites,
                meals: user.meals,
                personal: user.personal,
                dayData: user.dayData
            }
            res.redirect('/calculator')
        }else{
            User.update({username: req.body.username},{
                $set: {dayData: {month:date.getMonth(),day:date.getDate()}}
            }).then(i=>{
                let personalData = user.personal
                personalData.consumedCalories = 0
                personalData.consumedProtein = 0
                personalData.consumedCarbs = 0
                personalData.consumedFat = 0
                personalData.consumedWater = 0
                User.update({username: req.body.username},{
                    $set: {personal: personalData}
                }).catch(err=>console.log(err))
            }).then(()=>{
                User.findOne({username:req.body.username}).then(i=>{
                    req.session.user={
                        username: i.username,
                        name: i.name,
                        favourites: i.favourites,
                        meals: i.meals,
                        personal: i.personal,
                        dayData: i.dayData
                    }
                    res.redirect('/calculator')
                })
            }).catch(err=>console.log(err))
        }
    })
    res.redirect('/calculator')
})



module.exports = router