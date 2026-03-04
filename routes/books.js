const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const Author = require('../models/author');

router.get('/', function(req, res, next) {
  res.render('books/index', { title: 'BookedIn || Books', books: Book.all });
});

router.get('/form', function(req, res, next) {
  res.render('books/form', { title: 'BookedIn || Books', authors: Author.all});
});

router.post('/upsert', function(req, res, next) {
  console.log('body: ' + JSON.stringify(req.body));
  Book.upsert(req.body);
  res.redirect(303, '/books');
});

router.get('/edit', function(req, res, next) {
  let bookIdx = req.query.id;
  let book = Book.get(bookIdx);
  res.render('books/form', { title: 'BookedIn || Books', book: book, bookIdx: bookIdx, authors: Author.all});
});

router.get('/show/:id', function(req, res, next) {
  let bookIdx = req.params.id;
  let book = Book.get(bookIdx);
  let author = Author.get(book.authorId);
  let authors = []
  if (book.authorIds) {
    authors = book.authorIds.map(Author.get);
  }
  res.render('books/show', { title: 'BookedIn || Books', book: book, bookIdx: bookIdx, authors: authors});
});

module.exports = router;

