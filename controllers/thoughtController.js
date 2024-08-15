const Thought = require('../models/Thought');

module.exports = {
  async getThought(req, res) {
    try {
      const Thought = await Thought.find();
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new thought
  async createThought(req, res) {
    try {
      const dbThoughtData = await Thought.create(req.body);
      res.json(dbThoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  // update user
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id : req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
    if (!thought) {
    return res.status(404).json({ message: 'No thought with this id!' });
  }
    res.json(thought);
  } catch(err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // delete user
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });
      if (!thought) {
        return res.status(404).json({ message: 'No thought with that id!' });
      }
      const thoughtName = await thought.findOneandUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );
      if (!thoughtName) {
        return res
        .status(404).json({ message: 'No thought with that id!' });
      }
      res.json({ message: 'Thought successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
// add reaction stored in a single thought's reactions array field
async createReaction(req, res) {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { thoughts: req.body } },
      { runValidators: true, new: true },
    );
    if (!thought) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
},
// delete a reaction by reactions reactionId value
async deleteReaction(req, res) {
  try {
    const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });
    if (!thought) {
      return res.status(404).json({ message: 'No thought with that id!' });
    }
    const thoughtName = await Thought.findOneandUpdate(
      { thoughts: req.params.thoughtId },
      { $pull: { users: req.params.thoughtId } },
      { new: true }
    );
    if (!thoughtName) {
      return res
      .status(404).json({ message: 'No thought with that id!' });
    }
    res.json({ message: 'Thought successfully deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
},
};




