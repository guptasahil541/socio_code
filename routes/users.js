const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');
const postsController = require('../controllers/posts_controller');

router.get('/profile', usersController.profile);
router.get('/posts', postsController.posts);
router.get('/sign-in', usersController.signIn);
router.get('/sign-up', usersController.signUp);

router.post('/create', usersController.create);
router.post('/create-session', usersController.createSession);
router.get('/remove-session', usersController.removeSession);

module.exports = router;