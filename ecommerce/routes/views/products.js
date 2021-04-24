const express = require("express")
const router = express.Router()
const ProductsService = require("../../services/products")
const ProductService = new ProductsService()

router.get('/', async function(req, res, next) {
    // const { tags } = req.query
    try {
        const products = await ProductService.getProducts() 
        res.render("products", { products })    // Inject to the view engine
    } catch (err) {
        next(err)
    }
})

module.exports = router
