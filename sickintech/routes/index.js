var express = require('express');
var router = express.Router();
const resourceController = require('../controllers/resourceController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', catchErrors(resourceController.getResources));
router.get('/add', authController.isLoggedIn, resourceController.addResource);
router.post('/add', catchErrors(resourceController.createResource));
router.get('/resource/:slug', catchErrors(resourceController.getResourceBySlug));
router.get('/resources', catchErrors(resourceController.getResources));

router.get('/login', userController.loginForm);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/register', userController.registerForm);
router.post('/register', 
  userController.validateRegister,
  userController.register,
  authController.login);

module.exports = router;
