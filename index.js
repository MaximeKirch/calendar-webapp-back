const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const bodyparser = require('body-parser')
const userRoutes = require('./routes/user')
const authRoutes = require('./routes/auth')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const PORT =  process.env.PORT || 3001 

dotenv.config()

mongoose.connect(`mongodb+srv://root:${process.env.DB_PASSWORD}@cluster0.pcfkc2h.mongodb.net/?retryWrites=true&w=majority`,)
.then(console.log('MongoDB Connected'))
.catch(err => console.log(err))


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(cors())
app.use(cookieParser())
app.use(bodyparser.urlencoded({extended : false}))
app.use(bodyparser.json())
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)


app.get('/api', (req, res) => {
    res.status(200).send('Hello world')
})

app.listen(PORT, (req, res) => {
    console.log(`Server is listening on port ${PORT}`)
})