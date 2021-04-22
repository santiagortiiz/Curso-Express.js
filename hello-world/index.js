const express = require("express")
const app = express()

app.get('/', function(req, res, next) {
    res.send({"hellow": "world"})
})

// app.listen retorna un servidor
const server = app.listen(8000, function() {
    console.log(`APP listening at port ${server.address().port}`)
})