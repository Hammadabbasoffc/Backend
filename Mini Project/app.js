const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

// IMportant Staff
app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

// Models Required
const userModel = require('./models/user')
const postModel = require('./models/post')


app.get('/', (req, res)=>{
    res.render('index')
})


// Register Route
app.post('/register',async (req, res)=>{

    const {email, password, username, name, age} = req.body

    let user = await userModel.findOne({email})
    if(user) return res.status(500).send("Usr already exists")

    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(password, salt , async (err, hash)=>{
            let user = await userModel.create(
                {
                    email,
                    username,
                    password: hash,
                    name, 
                    age
                }
            );

            let token = jwt.sign({email: email , userId: user._id}, "Giuafopsdvugapsd")
            res.cookie("token", token)
            res.send("Registered")

        })
    })



})


// Login route
app.get('/login', (req, res)=>{
    res.render('login')
})

app.post('/login',async (req, res)=>{
    let {username, password} = req.body

    let user = await userModel.findOne({username})
    if(!user) return res.status(500).send("User Not found")

    bcrypt.compare(password, user.password, (err, result)=>{
        if(result)
            {
                let token = jwt.sign({username: username , userId: user._id}, "Giuafopsdvugapsd")
                res.cookie("token", token)
                res.status(200).redirect('/profile')
            }
            else res.redirect("/login")
    })

})


// Logout Rout
app.get('/logout',(req,res)=>{
    res.cookie("token", "")
    res.redirect("/login")
})



const isLoggedIn = (req, res, next)=>{
    if(req.cookies.token === "") return res.redirect('/login')
        else{
            let data = jwt.verify(req.cookies.token,"Giuafopsdvugapsd" )
            req.user = data
            next()
    }
}

app.get('/profile', isLoggedIn , async (req, res)=>{
    let user = await userModel.findOne({username: req.user.username}).populate("posts")
    res.render('profile', {user})
})


app.post('/post', isLoggedIn , async (req, res)=>{
    let user = await userModel.findOne({username: req.user.username})
    let {content} = req.body

    let post = await postModel.create({
        user: user._id,
        content
    })
    
    user.posts.push(post._id)
    await user.save()
    res.redirect('/profile')
})

app.listen(3000)