const express = require('express')
const bodyPareser = require('body-parser')

const app = express()

app.use(bodyPareser.urlencoded({ extended: true }))

const sequelize = require('./util/db')

sequelize
    .authenticate()
    .then(() => {
        console.log('<<<<<<!!Yes connected!!>>>>>>')
    })
    .catch((error) => {
        console.error('Somethings moldy', error)
    })


app.get('/', (req, res) => {
    res.json({ message: 'web shop app'})
})


app.listen(3005, () => {
    console.log('Server is running on http://localhost:3005')
})