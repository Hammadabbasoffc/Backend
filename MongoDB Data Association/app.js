const express = require('express');
const app = express()
const path = require('path')

const userModel = require("./models/user")
const postModel = require("./models/posts")

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, 'public')))




app.get('/',(req, res)=>{
    res.send("App is running")
})


app.get('/create', async (req, res)=>{
    let user = await userModel.create(
        {
            username: "Hammad",
            age: 22,
            email: "Hammad@gmail.com"
        }
    );

    res.send(user);
})

app.get('/posts/create', async (req, res)=>{
    const post = await postModel.create(
        {
            postData: "Hello This is Data",
            user: "66372dd28087f304c77f5501"
        }
    );

    let user = await userModel.findOne(
        {
            _id: "66372dd28087f304c77f5501"
        }
    )

    user.posts.push(post._id)
    await user.save
    res.send(
        {
            post,
            user
        }
    )
})



app.listen(3000)

