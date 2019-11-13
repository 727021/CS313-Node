var express = require('express');
var url = require('url')
var router = express.Router();

const mailTypes = ['Letters (Stamped)','Letters (Metered)','Large Envelopes (Flats)','First-Class Package Service-Retail']

function calculateRate(weight, type) {
    t = Number(type)
    w = Number(weight)
    if (w < 0 || w > 13) w = 0
    if (w == 0) return 0
    if (t == 0) { // Stamped
        if (w < 1) return 0.55
        if (w < 2) return 0.7
        if (w < 3) return 0.85
        if (w < 3.5) return 1
    } if (t == 1) { // Metered
        if (w < 1) return 0.5
        if (w < 2) return 0.65
        if (w < 3) return 0.8
        if (w < 3.5) return 0.95
    } if (t == 2) { // Flat
        if (w < 1) return 1
        if (w < 2) return 1.15
        if (w < 3) return 1.3
    } if (t < 3) { // All Envelopes
        if (w < 4) return 1.45
        if (w < 5) return 1.6
        if (w < 6) return 1.75
        if (w < 7) return 1.9
        if (w < 8) return 2.05
        if (w < 9) return 2.2
        if (w < 10) return 2.35
        if (w < 11) return 2.5
        if (w < 12) return 2.65
        if (w <= 13) return 2.8
    } if (t == 3) { // Package
        if (w < 4) return 3.66
        if (w < 8) return 4.39
        if (w < 12) return 5.19
        if (w <= 13) return 5.71
    }
    return 0
}

router.get('/', function(req, res, next) {
    q = url.parse(req.url, true).query
    res.writeHead(200, {'Content-Type':'application/json'})
    res.end(JSON.stringify({rate: calculateRate(q.weight, q.type)}))
});

module.exports = router;
