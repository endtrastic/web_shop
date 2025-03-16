const Product = require('../models/product');

class productController {
    async getAllProducts(req, res) {
        try {
            const products = await Product.findAll()

            if (products.length === 0) {
                return res.status(404).json({ message: 'Nothing to return'})
            }
            console.log(products)
            res.status(200).json({
                products: products
            })

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Somethings moldy', error: error.message });
        }
    }


    async getProductByID(req, res) {
        try {
            const { id } = req.params;

            const product = await Product.findOne({
                where: {id: id}
            })

            if (!product) {
                return res.status(404).json({ message: 'Product not found, sorry'})
            }
            console.log(product)
            res.status(200).json({
                product: product
            })

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Somethings moldy', error: error.message });
        }
    }

}

module.exports = new productController();
