import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
    },
    img: {
      type: String,
      default: "",
    },
    like: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    Comments: [
      {
        text: {
          type: String,
          required: true,
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);
export default Post;

//   const currentUser = await User.findById(req.user._id);
//   const following = currentUser.following;
//   const suggestedUsers = await User.find({
//     _id: { $nin: [...following, req.user._id] },
//   }).limit(10);
