const User = require('../models/User');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const userData = await User.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { users: userData._id} },
        { new: true } 
      );  
      if (!user) {
        return res.status(404).json({
          message: 'User created!'
        });
      }
      res.json('Created username!');
    } catch (err) {
      res.status(500).json(err);
    }
  },
// update user
async updateUser(req, res) {
  try {
    const user = await User.findOneAndUpdate(
      { _id : req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    );
  if (!user) {
  return res.status(404).json({ message: 'No username with this id!' });
}
  res.json(user);
} catch(err) {
    console.log(err);
    res.status(500).json(err);
  }
},
// delete user
async deleteUser(req, res) {
  try {
    const user = await User.findOneAndRemove({ _id: req.params.userId });
    if (!user) {
      return res.status(404).json({ message: 'No user with that id!' });
    }
    const userName = await User.findOneandUpdate(
      { users: req.params.userId },
      { $pull: { users: req.params.userId } },
      { new: true }
    );
    if (!userName) {
      return res
      .status(404).json({ message: 'No user with that id!' });
    }
    res.json({ message: 'User successfully deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
},
// get user and users friends
async getFriends(req,res) {
  try {
    User.findById(req.params.id)
    .lean()
    .populate("friends", "-friends -thoughts -__v")
    .then((data) => {
      res.json(data);
    });
  } catch (err) {
    res.status(404).json({ message: "Invalid userId! "});
  }
},
// add user to friends list
async addUserToFriends(req, res) {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $push: { friends: req.params.friendId } },
      { new: true },
    );
    if (!user) {
      return res.status(404).json({ message: 'No user with this id!' });
    }
    res.json({ message: "Successfully added to friends list!"});
  } catch (err) {
    res.status(500).json(err);
  }
},
// delete user from friends list
async deleteFriends(req, res) {
  try {
    const user = await User.findOneAndRemove({ _id: req.params.userId });
    if (!user) {
      return res.status(404).json({ message: 'No user with that id!' });
    }
    const userName = await User.findOneandUpdate(
      { users: req.params.userId },
      { $pull: { users: req.params.userId } },
      { new: true }
    );
    if (!userName) {
      return res
      .status(404).json({ message: 'No user with that id!' });
    }
    res.json({ message: 'User successfully deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
},
};
