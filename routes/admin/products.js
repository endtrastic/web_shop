const express = require('express')
const router = express.Router()
const prodController = require('../../controllers/admin/product')

router.post('/product/add', (req,res) => prodController.addProduct(req,res))
router.get('/products', (req,res) => prodController.getAllProds(req,res))
router.get('/products/:id', (req,res) => prodController.getProdByID(req,res))
router.patch('/products/upt/:id', (req, res) => prodController.uptProdByID(req, res));
router.delete('/products/del/:id', (req,res) => prodController.delProdByID(req,res))


module.exports = router