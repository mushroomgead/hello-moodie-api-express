const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./db')

const app = express()
const PORT = 4000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.post('/user', db.createUser)
app.get('/user', db.getAllUsers)
app.get('/user/:id', db.getUsersById)
app.get('/moods', db.getMoods)
app.get('/mood/:id', db.getMood)
app.post('/mood/:id', db.createMood)
app.put('/mood/:user_id/:status', db.updateMood)
app.get('/user/:username', db.checkUsernameIsExits)

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`)
})