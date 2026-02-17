const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  const books = [
    "book1", "book2", "book3"
  ]
  res.render('books/index', { title: 'BookedIn || Books', books: books });
});

module.exports = router;

