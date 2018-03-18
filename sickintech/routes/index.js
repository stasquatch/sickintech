var express = require('express');
var app = express();
var router = express.Router();
const resourceController = require('../controllers/resourceController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', catchErrors(resourceController.getResources));
router.get('/add', authController.isLoggedIn, resourceController.addResource);
router.post('/add', catchErrors(resourceController.createResource));
router.post('/add/:slug', catchErrors(resourceController.updateResource));
router.get('/resource/:slug', catchErrors(resourceController.getResourceBySlug));
router.get('/resources', catchErrors(resourceController.getResources));
router.get('/resource/:slug/edit', catchErrors(resourceController.editResource));

router.get('/about', function(req, res) {
  res.render('about', { title: 'About Sick in Tech' });
});
router.get('/contact', function(req, res) {
  res.render('contact', { title: 'Contact' });
});

router.get('/account', authController.isLoggedIn, userController.accountInfo);
router.post('/account/forgot', catchErrors(authController.forgot));
router.get('/account/reset/:token', catchErrors(authController.reset));
router.post('/account/reset/:token', authController.confirmedPasswords, catchErrors(authController.update));
router.get('/login', userController.loginForm);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/register', userController.registerForm);
router.post('/register', 
  userController.validateRegister,
  catchErrors(userController.register),
  authController.login);

module.exports = router;
