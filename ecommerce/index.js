const express = require("express")
const path = require("path")
const productsRouter = require("./routes/views/products")
const productsApiRouter = require("./routes/api/products")

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
app.use('/api/products', productsApiRouter)     

/* Routes redirection */
app.use('/', function(req, res) {
    res.redirect('/products')
})

/* Server */
// app.listen retorna un servidor
const server = app.listen(8000, function() {
    console.log(`listening http://localhost:${server.address().port}`)
})