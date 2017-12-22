var express = require('express');
var router = express.Router();
const resourceController = require('../controllers/resourceController');
const userController = require('../controllers/userController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', catchErrors(resourceController.getResources));
router.get('/add', resourceController.addResource);
router.post('/add', catchErrors(resourceController.createResource));
router.get('/resource/:slug', catchErrors(resourceController.getResourceBySlug));
router.get('/resources', catchErrors(resourceController.getResources));
router.get('/login', userController.login);

module.exports = router;
