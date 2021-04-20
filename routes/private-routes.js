const router = require("express").Router()
const path = require("path")
const User = require('../models/model')




const userAuth = (req,res,next)=>{
    if(!req.session.user){
        res.redirect('/calculator')
    }else{
        next()
    }
}


router.get('/info',(req,res)=>{
    if(req.session.user){
        User.findOne({username:req.session.user.username}).then(data=>{
            res.send({
                user: {
                    username: data.username,
                    name: data.name,
                    favourites: data.favourites,
                    meals: data.meals,
                    personal: data.personal,
                    dayData: data.dayData
                },
                keys:{APP_KEY:process.env.APP_KEY,APP_ID:process.env.APP_ID}
            })
        }).catch(err=>console.log(err))
    }else{
        res.send({user:null,keys:{APP_KEY:process.env.APP_KEY,APP_ID:process.env.APP_ID}})
    }
})


router.get('/meals',userAuth,(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../static/index.html'))
})
router.get('/progress',userAuth,(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../static/index.html'))
})
router.get('/favorites',userAuth,(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../static/index.html'))
})

router.post('/create-meal',(req,res)=>{
    User.update({username:req.body.username},{
        $push: {meals:{
            mealType:req.body.mealType,mealName:req.body.mealName,ingredients:req.body.ingredients,id:req.body.id,
            calories: req.body.calories,protein:req.body.protein,carbs:req.body.carbs,fat:req.body.fat
        }}
    }).then(()=>{
        User.findOne({username:req.body.username}).then(user=>{
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

router.post('/save-progress',(req,res)=>{
    let personal = ''
    User.findOne({username:req.session.user.username}).then(i=>{
        personal = i.personal
        personal.consumedCalories+= req.body.calories
        personal.consumedProtein+= req.body.protein
        personal.consumedCarbs+= req.body.carbs
        personal.consumedFat+= req.body.fat
        User.update({username:req.session.user.username},{
            $set: {personal:personal}
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
            }).catch(err=>console.log(err))
        })
    }).catch(err=>console.log(err))
})

router.post('/remove-meal',(req,res)=>{
    User.update({username:req.session.user.username},{
        $pull: {meals:{id:req.body.id}}
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

module.exports = router