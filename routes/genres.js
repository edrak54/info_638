const express = require('express');
const router = express.Router();
const Genre = require('../models/genre');

router.get('/', function(req, res, next) {
  res.render('genres/index', { title: 'BookedIn || Books', genres: Genre.all });
});

router.get('/form', function(req, res, next) {
  res.render('genres/form', { title: 'BookedIn || Genres' });
});

router.post('/upsert', function(req, res, next) {
  console.log('body: ' + JSON.stringify(req.body));
  Genre.upsert(req.body);
  let createdOrupdated = req.body.id ? 'updated' : 'created';
  req.session.flash = {
    type: 'info',
    intro: 'Success!',
    message: `the genre has been ${createdOrupdated}!`,
  };
  res.redirect(303, '/genres');
});

router.get('/edit', function(req, res, next) {
  let genreIdx = req.query.id;
  let genre = Genre.get(genreIdx);
  res.render('genres/form', { title: 'BookedIn || Genres', genre: genre, genreIdx: genreIdx });
});

module.exports = router;
