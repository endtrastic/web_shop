const express = require('express')
const router = express.Router()
const shopController = require('../controllers/shop')

router.get('/getcart', (req,res) => shopController.getCart(req,res))
router.post('/cart/add', (req,res) => shopController.postCart(req,res))
router.delete('/delcart/:id', (req,res) => shopController.delCart(req,res))


module.exports = router