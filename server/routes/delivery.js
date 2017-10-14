'use strict'

const express = require('express');
const router = express.Router();
const controller =  require('../controllers/delivery');

router.get('/', controller.get);
router.post('/', controller.post);
router.delete('/', controller.delete);

module.exports = router;