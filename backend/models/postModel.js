const mongoose = require("mongoose");
const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    text: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    name: {
      type: String
    },
    likes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "User"
        }
      }
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "User"
        },
        text: {
          type: String,
          required: true
        },
        title: {
          type: String,
          required: true
        },
        name: {
          type: String
        },
        date: {
          type: Date,
          default: Date.now
        },
        link: {
          type: String
        },
        image: {
          type: String
        }
      }
    ],
    link: {
      type: String
    },
    image: {
      type: String
    },
    postByAdmin: {
      type: Boolean,
      required: true,
      default: false
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = Post = mongoose.model("Post", postSchema);
