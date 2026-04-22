const express = require('express');
const router = express.Router();
const Genre = require('../models/genre');

router.get('/', async (req, res, next) => {
  let genres = await Genre.all();
  res.render('genres/index', { title: 'BookedIn || Genres', genres: genres });
});

router.get('/form', async function(req, res, next) {
  res.render('genres/form', { title: 'BookedIn || Genres' });
});

router.post('/upsert', async function(req, res, next) {
  console.log('body: ' + JSON.stringify(req.body));
  await Genre.upsert(req.body);
  let createdOrupdated = req.body.id ? 'updated' : 'created';
  req.session.flash = {
    type: 'info',
    intro: 'Success!',
    message: `the genre has been ${createdOrupdated}!`,
  };
  res.redirect(303, '/genres');
});

router.get('/edit', async function(req, res, next) {
  let templateVars = { title: 'BookedIn || Genres' }
  if (req.query.id) {
    let genre = await Genre.get(req.query.id)
    if (genre) {templateVars['genre'] = genre}
  }
  res.render('genres/form', templateVars);
});

module.exports = router;
