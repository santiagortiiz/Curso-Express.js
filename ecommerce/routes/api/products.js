const express = require("express")
const passport = require("passport")
const ProductsService = require("../../services/products")
const ProductService = new ProductsService()
const validation = require("../../utils/middlewares/validationHandler")
const cacheResponse = require("../../utils/cacheResponse")
const { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } = require("../../utils/time")
const { 
    productIdSchema, 
    productTagSchema, 
    createProductSchema, 
    updateProductSchema } = require("../../utils/schemas/products")

/* JWT strategy */
require("../../utils/auth/strategies/jwt")

function productsApi(app) {
    const router = express.Router()
    app.use("/api/products", router)

    router.get('/', async function(req, res, next) {
        cacheResponse(res, FIVE_MINUTES_IN_SECONDS)
        const { tags } = req.query
        try {
            const products = await ProductService.getProducts({ tags })
        
            data = {
                data: products,
                message: 'products listed'
            }
            res.status(200).send(data)
        } catch (err) {
            console.log(err)
            next(err)
        }
    })

    router.get('/:productId', validation(productIdSchema, "params"), async function(req, res, next) {
        cacheResponse(res, SIXTY_MINUTES_IN_SECONDS)
        const { productId } = req.params

        try {
            const product = await ProductService.getProduct({ productId })
        
            data = {
                data: product,
                message: 'product'
            }
            res.status(200).send(data)
        } catch (err) {
            next(err)
        }
    })

    router.post('/', validation(createProductSchema), async function(req, res, next) {
        const { body: product } = req
        console.log(product)
        try {
            const createdProductId = await ProductService.createProduct({ product })
            data = {
                data: createdProductId,
                message: 'product posted'
            }
            res.status(201).send(data)
        } catch (err) {
            next(err)
        }
    })

    router.put('/:productId', 
        passport.authenticate("jwt", { session: false }),
        validation(productIdSchema, "params"), 
        validation(updateProductSchema), 
        async function(req, res, next) {
        const { productId } = req.params
        const { body: product } = req        // Destructure: body as updateInfo
        
        try {
            const updatedProduct = await ProductService.updateProduct({ productId, product })
            data = {
                data: updatedProduct,
                message: 'products updated'
            }
            res.status(200).send(data)
        } catch (err) {
            next(err)
        }
    })

    router.delete('/:productId', 
        passport.authenticate("jwt", { session: false }),
        validation(productIdSchema), async function(req, res, next) {
        const { productId } = req.params
        try {
            const deletedProduct = await ProductService.deleteProduct({ productId })
            data = {
                data: deletedProduct,
                message: 'products deleted'
            }
            res.status(200).send(data)
        } catch (err) {
            next(err)
        }
    })
}
module.exports = productsApi