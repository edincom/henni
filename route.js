let express = require('express');
let router = express.Router();

let tvController = require('./controllers/tvController');


router.get('/tv', tvController.tvList);

module.exports = router