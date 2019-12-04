const express = require('express')
var router = express.Router()

//#region Middleware
router.use(function logRequest(req, res, next) {
    console.log(`Received a request for: ${req.url}`)
    next()
})

router.use('/getServerTime', function verifyLogin(req, res, next) {
    if (req.session.username) next()
    else res.sendStatus(401)
})
//#endregion

router.post('/login', (req, res, next) => {
    let username = req.body.username
    let password = req.body.password
    if (username == 'admin' && password == 'password') {
        req.session.username = username
        return res.send({success: true})
    }
    res.send({success: false})
})

router.post('/logout', (req, res, next) => {
    if (req.session.username) {
        req.session.destroy(console.error)
        return res.send({success: true})
    }
    res.send({success: false})
})

router.get('/getServerTime', (req, res, next) => {
    res.send({success: true, time: new Date()})
})

// This isn't required, but it makes getting to the page easier
router.get('/', (req, res, next) => {
    res.redirect('./test.html')
})

module.exports = router