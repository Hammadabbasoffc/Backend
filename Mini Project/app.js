const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()

// IMportant Staff
app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

// Models Required
const userModel = require('./models/user')



app.get('/', (req, res)=>{
    res.render('index')
})

app.listen(3000)