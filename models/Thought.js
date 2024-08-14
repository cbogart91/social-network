const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    username: {
        type: String,
        required: true,
    },

    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);


module.exports = thoughtSchema;