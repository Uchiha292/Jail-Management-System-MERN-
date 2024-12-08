const express = require('express');
const router = express.Router();
const { 
    loginWarden,
    addWarden 
} = require('../controllers/wardenController');



router.post('/login', loginWarden);
router.post('/add', addWarden);

module.exports = router;