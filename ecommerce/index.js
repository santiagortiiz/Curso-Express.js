const express = require("express")
const path = require("path")
const app = express()
const productsRouter = require("./routes/products")

app.set("views", path.join(__dirname, "views"))  // Execute in the path where the app exist
app.set("view engine", "pug")

app.use('/products', productsRouter)

// app.listen retorna un servidor
const server = app.listen(8000, function() {
    console.log(`listening http://localhost:${server.address().port}`)
})