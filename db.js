require('dotenv').config()
const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
  })


const createUser = (request, response) => {
    const { username, password, email } = request.body

    pool.query(`INSERT INTO users (username, password, email) VALUES ('${username}', '${password}', '${email}')`, 
    (error, results) => {
        console.log(request.body, 'results');
        if (error) {
        throw error
        }
        response.status(200).json(`created!`)
    })
}

const getUsersById = (request, response) => {
    const id = request.params.id
    pool.query("SELECT * from users WHERE id = '" + id + "'", (error, results) => {
        response.status(200).json(results.rows)
    })
}

const getAllUsers = (request, response) => {
    pool.query("SELECT * from users", (error, results) => {
        response.status(200).json(results.rows)
    })
}

const getAllMood = (request, response) => {
    pool.query("SELECT * from moods ORDER by created_date", (error, results) => {
        response.status(200).json(results.rows)
    })
}

const getMoodById = (request, response) => {
    const id = request.params.id

    pool.query("SELECT * FROM moods WHERE user_id = '" + id + "'", 
    (error, results) => {
        if (error) {
        throw error
        }
        response.status(200).json(results.rows)
    })
}

const createMood = (request, response) => {
    const { id, status, note } = request.body

    pool.query(`INSERT INTO moods (user_id, status, note) VALUES ('${id}', '${status}', '${note}')`, 
    (error, results) => {
        if (error) {
        throw error
        }
        response.status(200).json(`created`)
    })
}

const updateMood = (request, response) => {
    const { user_id, status, id } = request.body

    pool.query("UPDATE moods SET user_id='" + user_id + "', status='" + status + "' where id='" + id + "'", 
    (error, results) => {
        if (error) {
        throw error
        }
        response.status(200).json(`updated`)
    })
}

const checkUsernameIsExits = (request, response) => {
    const username = request.params.username
    pool.query("SELECT * from users WHERE username = '" + username + "'", (error, results) => {
        response.status(200).json(results.rows)
    })
}

module.exports = {
    createUser,
    getUsersById,
    getAllUsers,
    getMoodById,
    getAllMood,
    createMood,
    updateMood,
    checkUsernameIsExits
  }