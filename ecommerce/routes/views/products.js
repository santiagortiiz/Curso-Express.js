const config = require("../../config/index")
const express = require("express")
const router = express.Router()
const ProductsService = require("../../services/products")
const ProductService = new ProductsService()

const cacheResponse = require("../../utils/cacheResponse")
const { FIVE_MINUTES_IN_SECONDS } = require("../../utils/time")

router.get('/', async function(req, res, next) {
    cacheResponse(res, FIVE_MINUTES_IN_SECONDS)
    const { tags } = req.query
    try {
        const products = await ProductService.getProducts({ tags }) 
        res.render("products", { products, dev: config.dev })    // Inject to the view engine
    } catch (err) {
        next(err)
    }
})

module.exports = router
