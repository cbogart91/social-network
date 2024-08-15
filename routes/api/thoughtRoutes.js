const router = require('express').Router();
const {
    getThought,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
} = require('../../controllers/thoughtController');


//  /api/thought
router.route('/')
    .get(getThought)
    .post(createThought);

// /api/thought/:thoughtId
router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// /api/thought/:thoughtId/reaction
router.route('/:thoughtId/reaction')
    .post(createReaction)
    .delete(deleteReaction);

module.exports = router;