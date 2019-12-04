var express = require('express')
var router = express.Router()
// c62d4f0f
router.get('/', (req, res, next) => {
    res.render('11/team', {})
})

module.exports = router