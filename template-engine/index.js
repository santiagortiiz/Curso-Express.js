const express = require("express")
const app = express()
const expressJsx = require("./express-jsx")

/* Engine definition */
app.engine("jsx", expressJsx)
app.set("views", "./views")     // Indicate where are the views
app.set("view engine", "jsx")   // Indicate that view engine is jsx

app.get('/', function(req, res) {
    // Render a view from ./views
    res.render("index", {hello: 'hola', world: 'mundo'})
})

const server = app.listen(8000, function() {
    console.log(`listening http://localhost:${server.address().port}`)
})

