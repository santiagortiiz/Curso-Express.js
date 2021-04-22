var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    const mySelf = {
        "name": "Santiago",
        "last name": "Ortiz",
        "age": 25,
        "active": true,
    }
    res.send(mySelf);
});

module.exports = router;