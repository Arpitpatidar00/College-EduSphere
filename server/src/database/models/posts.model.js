import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    postOwner: {
      type: String,
      required: true,
    },
    postDescription: {
      type: String,
    },
    postImage: {
      type: String,
    },
    postDate: {
      type: Date,
      default: Date.now
    },
    postLikes : {
      type: Number,
      default: 0
    },
    postLikedByUsersArray:[{
      type: String,    
    }],
    postComments: [{
      type: String,
    }],
    postCommentedByUsersArray:[{
      type: String,
    }],
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);