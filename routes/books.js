const express = require('express');
const router = express.Router();
const Book = require('../models/book');

router.get('/', function(req, res, next) {
  res.render('books/index', { title: 'BookedIn || Books', books: Book.all });
});

router.get('/form', function(req, res, next) {
  res.render('books/form', { title: 'BookedIn || Books' });
});

router.post('/create', function(req, res, next) {
  console.log('body: ' + JSON.stringify(req.body));
  Book.add(req.body);
  res.redirect(303, '/books');
});

module.exports = router;

