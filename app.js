const express = require('express')
const mongoose = require('mongoose');
const {
    MONGO_URI
} = require('./config/keys');
const authRoute = require('./route/authRoutes')
var bodyParser = require('body-parser');
const cors = require('cors')




const app = express()
const PORT = process.env.PORT || 5000


//middleware

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use(cors())

//routes

app.use('/auth', authRoute)

//TODO: For deployment

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static('client/build'))
//     const path = require('path')
//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//     })
// }


mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Database connected...')
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    })
    .catch(err => {
        // console.log(err)
        console.log('Error occurred')
    })