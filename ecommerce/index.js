const debug = require("debug")("app:server")
const express = require("express")
const path = require("path")
const boom = require("boom")
const productsRouter = require("./routes/views/products")
const authApiRouter = require("./routes/api/auth")
const productsApiRouter = require("./routes/api/products")
const { 
    logErrors, 
    wrapErrors, 
    clientErrorHandler, 
    errorHandler,  
} = require("./utils/middlewares/errorsHandlers")

const isRequestAjaxOrApi = require("./utils/isRequestAjaxOrApi")

/* App */
const app = express()

/* Middlewares */
app.use(express.json())             
app.use(express.urlencoded({ extended: false }))

/* View Engine Setup */
app.set("views", path.join(__dirname, "views"))  // Execute in the path where the app exist
app.set("view engine", "pug")
app.use("/static", express.static(path.join(__dirname, "public")))

/* Routes to the views*/
app.use('/products', productsRouter)            

/* Routes to the APIs */
app.use('/api/auth', authApiRouter)
productsApiRouter(app)  // app.use('/api/products', productsApiRouter)     

/* Redirection routes */
app.use('/', function(req, res) {
    res.redirect('/products')
})

/* Not found middleware */
app.use(function(req, res, next) {
    if (isRequestAjaxOrApi(req)) {
        const {
            output: { statusCode, payload }
        } = boom.notFound()     // Instance boom object
        res.status(statusCode).json(payload)
    }
    res.status(404).render("404")
})

/* Error Handlers (must be at the end of the routes) */
app.use(logErrors)
app.use(wrapErrors)
app.use(clientErrorHandler)
app.use(errorHandler)

/* Server */
// app.listen retorna un servidor
const server = app.listen(8000, function() {
    debug(`listening http://localhost:${server.address().port}`)  
    // console.log(`listening http://localhost:${server.address().port}`)
})