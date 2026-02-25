const express = require('express');
const router = express.Router();
const Book = require('../models/book');

router.get('/', function(req, res, next) {
  res.render('books/index', { title: 'BookedIn || Books', books: Book.all });
});

router.get('/form', function(req, res, next) {
  res.render('books/form', { title: 'BookedIn || Books' });
});

router.post('/upsert', function(req, res, next) {
  console.log('body: ' + JSON.stringify(req.body));
  Book.upsert(req.body);
  res.redirect(303, '/books');
});

router.get('/edit', function(req, res, next) {
  let bookIdx = req.query.id;
  let book = Book.get(bookIdx);
  res.render('books/form', { title: 'BookedIn || Books', book: book, bookIdx: bookIdx });
});

module.exports = router;

