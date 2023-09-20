//EXPORT API ROUTES
const router = require('express').Router();
const article = require('./articleRoutes');
const comment = require('./commentRoutes');
const user = require('./userRoutes');

router.use('/articles', article)
router.use('/comments', comment);
router.use('/users', user);

module.exports = router;
