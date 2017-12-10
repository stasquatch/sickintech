var express = require('express');
var router = express.Router();
const resourceController = require('../controllers/resourceController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', (req, res) => {
  res.render('index', { title: 'Sick in Tech' });
});

router.get('/add', resourceController.addResource);
router.post('/add', catchErrors(resourceController.createResource));
router.get('/resource/:slug', catchErrors(resourceController.getResourceBySlug));
router.get('/resources', catchErrors(resourceController.getResources));

module.exports = router;
