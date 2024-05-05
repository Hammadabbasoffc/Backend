const cookieParser = require('cookie-parser');
const userModel = require('./models/user')
const express = require('express');
const path = require('path');
const { create } = require('domain');
const app = express();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.render("index")
})

app.post('/create',  (req, res) => {
    let {username, email, password, age} = req.body;
    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(password, salt, async (err, hash)=>{
            let createdUser =  await userModel.create(
                {
                    username,
                    email,
                    password: hash,
                    age
                }
            )

            let token = jwt.sign(email, 'akijsfhpbhbpaiufhsdpaoi')
            res.cookie('token', token);
            res.send(createdUser);

        })
    })

    
});

app.get('/login', (req, res)=>{
    res.render('login')
})

app.post('/login', async (req, res) => {
    try {
        let user = await userModel.findOne({ username: req.body.username })
        if (!user) {
            return res.status(401).send("User not found");
        }

        const isValidPassword = await bcrypt.compare(req.body.password, user.password)
        if (isValidPassword) {
            let token = jwt.sign({email: user.email}, 'akijsfhpbhbpaiufhsdpaoi')
            res.cookie('token', token);
            return res.send("You are logged in")
        } else {
            return res.status(401).send("Invalid credientials")
        }
    } catch (error) {
        return res.status(500).send("Something went wrong")
    }
})

app.get("/logout", (req, res)=>{
    res.cookie("token", "");
    res.redirect("/")
})

app.listen(3000);