const Product = require('../../models/product');

class adminController {
    async addProduct(req, res) {
        try {
            const { title, price, imageUrl, description} = req.body;
            const userId = req.user.id

            if (!title || !price || !imageUrl || !description) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            const product = await Product.create({
                title,
                price,
                imageUrl,
                description,
                userId
            });

            res.status(201).json({
                message: 'Product added',
                productId: product.id,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Something went wrong', error: error.message });
        }
    }
    async getAllProds(req, res) {
        try {
            const allproducts = await Product.findAll()

            res.status(201).json({
                message: 'All products: ', allproducts
            })
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Something went wrong', error: error.message });
        }
    }

    async getProdByID(req, res) {

        try {
            const { id } = req.params
            const product = await Product.findOne({
                where: {id:id}
            })

            if (!product) {
                return res.status(404).json({ message: 'Product not found, sorry'})
            }

            res.status(200).json({
                message: 'Singular product returned with specified id: ', product
            })
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Somethings wrong I cant feel it', error: error.message });
        }
    }

    async uptProdByID(req, res) {

        try {
            const { id } = req.params
            const { title, price, imageUrl, description } = req.body;
            const [updateRow] = await Product.update(
                {
                    title,       
                    price,       
                    imageUrl,  
                    description, 
                },
                {
                    where: { id: id } 
                }
            );

            if (updateRow === 0) {
                return res.status(404).json({ message: 'Please enter the stuff, you want to update'})
            }



            res.status(200).json({
                message: `Successfully updated the product with ID: ${id}`,
                updatedProduct: { id, title, price, imageUrl, description }
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Somethings wrong I cant feel it', error: error.message });
        }
    }

    async delProdByID(req, res) {

        try {
            const { id } = req.params
            const delproduct = await Product.destroy({
                where: {id:id}
            })

            if (delproduct === 0) {
                return res.status(404).json({ message: 'Product not found, sorry'})
            }

            res.status(200).json({
                message: 'Deleted the product, with the id: ', id
            })
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Somethings wrong I cant feel it', error: error.message });
        }
    }
}

module.exports = new adminController();
