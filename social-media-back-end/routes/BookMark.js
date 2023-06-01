var express = require('express');
var router = express.Router();

const BookMarkController = require('../controllers/BookMark') ;


router.patch('/:id',BookMarkController.createBookMarkPosts) ;
router.patch('/remove/:id',BookMarkController.removeBookMarkedPosts) ;
router.get('/save',BookMarkController.getBookMarkedPosts) ;

module.exports = router ; 