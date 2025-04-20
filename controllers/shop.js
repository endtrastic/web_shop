const Product = require('../models/product');
const Cart = require('../models/cart')
const CartItem = require('../models/cart-item')

class shopController {
    async getAllProducts(req, res) {
        try {
            const products = await Product.findAll()

            if (products.length === 0) {
                return res.status(404).json({ message: 'Nothing to return'})
            }
            console.log(products)
            res.status(201).json({
                products: products
            })

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Somethings moldy', error: error.message });
        }
    }


    async getCart(req, res) {

        const userCart = await req.user.getCart()
        console.log(userCart)
        const cartProducts = await userCart.getProducts()
        res.status(201).json({
            products: cartProducts
        })

    }


    async postCart(req, res) {
      try {
          let userCart = await req.user.getCart({
              include: {
                  model: Product,
                  through: { attributes: ["quantity"] },
              },
          });
  
          // If no cart found, create a new one
          if (!userCart) {
              userCart = await req.user.createCart(); // Assuming you have a `createCart` method on `user`
          }
  
          // If the cart has no products yet
          if (!userCart.Products.length) {
              return res.status(200).json({ message: "Your cart is empty." });
          }
  
          // Map the products from the cart with quantities
          const cartProducts = userCart.Products.map((product) => ({
              id: product.id,
              title: product.title,
              price: product.price,
              imageUrl: product.imageUrl,
              description: product.description,
              quantity: product.CartItem ? product.CartItem.quantity : 0, // Default to 0 if CartItem doesn't exist
          }));
  
          return res.status(200).json({
              products: cartProducts,
          });
      } catch (error) {
          console.error("Error fetching cart:", error);
          return res.status(500).json({ message: "Something went wrong", error: error.message });
      }
    }
  


    async delCart(req, res) {

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

module.exports = new shopController();
