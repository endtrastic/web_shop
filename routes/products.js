const express = require('express')
const router = express.Router()
const prodController = require('../controllers/product')

router.get('/getprods', (req,res) => prodController.getAllProducts(req,res))
router.get('/getprods/:id', (req,res) => prodController.getProductByID(req,res))

module.exports = router