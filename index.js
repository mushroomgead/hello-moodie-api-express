const express = require('express')
const cors = require('cors')
const db = require('./db')

const app = express()
const PORT = 4000

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.post('/user/create', db.createUser)
app.get('/user', db.getAllUsers)
app.get('/user/check/:username', db.checkUsernameIsExits)
app.get('/user/:id', db.getUsersById)

app.get('/mood/all', db.getAllMood)
app.get('/mood/:id', db.getMoodById)
app.post('/mood/create', db.createMood)
app.put('/mood/update', db.updateMood)

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`)
})