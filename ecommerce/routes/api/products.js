const express = require("express")
const router = express.Router()
const ProductsService = require("../../services/products")
const ProductService = new ProductsService()


router.get('/', async function(req, res, next) {
    const { tags } = req.query

    try {
        const products = await ProductService.getProducts({ tags })
    
        data = {
            data: products,
            message: 'products listed'
        }
        res.status(200).send(data)
    } catch (err) {
        next(err)
    }
})

router.get('/:productId', async function(req, res, next) {
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

router.post('/', async function(req, res, next) {
    const { product } = req.body

    try {
        const createdProduct = await ProductService.createProduct({ product })
        data = {
            data: createdProduct,
            message: 'product posted'
        }
        res.status(201).send(data)
    } catch (err) {
        next(err)
    }
})

router.put('/', async function(req, res, next) {
    const { productId } = req.params
    const { body: updateInfo } = req        // Destructure: body as updateInfo
    
    try {
        const updatedProduct = await ProductService.updateProduct({ productId, updateInfo })
    
        data = {
            data: updatedProduct,
            message: 'products updated'
        }
        res.status(200).send(data)
    } catch (err) {
        next(err)
    }
})

router.delete('/:productId', async function(req, res, next) {
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

module.exports = router