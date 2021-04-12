const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db')


const app = express()
const PORT = 4000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.post('/user', db.createUser)
app.get('/user', db.getUsers)
app.get('/user/moods', db.getMoods)
app.get('/user/:id', db.getUsersById)
app.get('/user/mood/:id', db.getMood)
app.post('/user/mood/:id', db.createMood)
app.put('/user/mood/:user_id/:status', db.updateMood)
app.get('/user/:username', db.checkUsernameIsExits)

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`)
})