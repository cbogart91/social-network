const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addUserToFriends,
    deleteFriends
} = require('../../controllers/userController');


//  /api/username
router.route('/')
    .get(getUsers)
    .post(createUser);

// /api/users/:usernameId
router.route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
    .post(addUserToFriends)
    .delete(deleteFriends);


module.exports = router;