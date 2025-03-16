const express = require('express')
const bodyPareser = require('body-parser')

const app = express()

app.use(bodyPareser.urlencoded({ extended: true }))


const productAdminRoutes = require('./routes/admin/products')
app.use('/admin', productAdminRoutes)

const productRoutes = require('./routes/products')
app.use(productRoutes)


const sequelize = require('./util/db')


const models = require('./models/index')
sequelize.models = models

sequelize
    .sync()
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