var express = require('express')
var router = express.Router()
var {Pool} = require('pg')
const pool = new Pool(process.env.DATABASE_URL || {
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
})

router.get('/', (req, res, next) => {
    res.redirect('http://mtgbuilder.herokuapp.com/')
})

router.get('/team', (req, res, next) => {
    res.redirect('/team/getPerson?id=1')
})

router.get('/team/getPerson', (req, res) => {
    pool.query('SELECT * FROM person WHERE id = $1', [req.query.id], function(err, result) {
        if (err) {
            console.log("Error in query: ")
            console.log(err);
        }
        console.log("Back from DB with result:");
        console.log(result.rows);
        res.send(result.rows)
    })
})

module.exports = router