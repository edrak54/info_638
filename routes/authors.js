const express = require('express');
const router = express.Router();
const Author = require('../models/author');

router.get('/', async (req, res, next) => {
 let authors = await Author.all();
 res.render('authors/index', { title: 'BookedIn || Authors', authors: authors });
});

router.get('/form', async function(req, res, next) {
  res.render('authors/form', { title: 'BookedIn || Authors' });
});

router.post('/upsert', async function(req, res, next) {
  console.log('body: ' + JSON.stringify(req.body));
  await Author.upsert(req.body);
  let createdOrupdated = req.body.id ? 'updated' : 'created';
  req.session.flash = {
    type: 'info',
    intro: 'Success!',
    message: `the author has been ${createdOrupdated}!`,
  };
  res.redirect(303, '/authors');
});

router.get('/edit', async (req, res, next) => {
  let templateVars = { title: 'BookedIn || Authors' }
  if (req.query.id) {
    let author = await Author.get(req.query.id)
    if (author) {templateVars['author'] = author}
  }
  res.render('authors/form', templateVars);
});

module.exports = router;

