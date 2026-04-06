const express = require('express');
const router = express.Router();

const Comment = require('../models/comment');


router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body))
  let redirect = `/books/show/${req.body.bookId}`;
  Comment.upsert(req.body);
  req.session.flash = {
    type: 'info',
    intro: 'Success!',
    message: `the comment has been posted!`,
  };
  res.redirect(303, redirect)
});

router.get('/edit', async (req, res, next) => {
  let commentId = req.query.id;
  let comment = Comment.get(commentId);
  if (req.session.currentUser.email != comment.userEmail){
    return req.session.flash = {
      type: 'danger',
      intro: 'Error!',
      message: `Login to edit comment.`
    };
    res.redirect(303, `/books/show/${req.body.bookId}`);
  }
  res.render('comments/form', {
    title: 'BookedIn || Comments',
    comment: comment
  });
});

module.exports = router;