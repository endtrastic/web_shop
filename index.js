const express = require('express')
const bodyPareser = require('body-parser')

const app = express()

app.use(bodyPareser.urlencoded({ extended: true }))

const sequelize = require('./util/db')

app.use((req, res, next) => {
    models.User.findByPk(1)
      .then(user => {
        req.user = user;
        next()
      }) 
      .catch(err => console.log(err))
})



// Actually using all of the routes

const productAdminRoutes = require('./routes/admin/products')
app.use('/admin', productAdminRoutes)

const productRoutes = require('./routes/products')
app.use(productRoutes)

const shopRoutes = require('./routes/shop')
app.use(shopRoutes)

const orderRoutes = require("./routes/orders");
app.use(orderRoutes);
 



const models = require('./models/index')
sequelize.models = models
console.log(sequelize.models)

sequelize
    .sync({force: true})
    .then(() => {
        return models.User.findByPk(1)
    })
    .then(user => {
        if (!user) {
            return models.User.create({ name: 'user', email: 'user@local.com'})
        }
        return user;
    })
    .then((user) => {
        return user.createCart()
    })
    .then((cart) => {
        console.log(cart)
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