const router = require('express').Router();
const {
    getThought,
    getSingleThought,
    createThought,
} = require('../../controllers/thoughtController');


//  /api/thought
router.route('/').get(getThought).post(createThought);

// /api/thought/:thoughtId
router.route('/:thoughtId').get(getSingleThought);

module.exports = router;