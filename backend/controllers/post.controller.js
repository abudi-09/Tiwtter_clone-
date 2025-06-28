import User from "../models/user.model.js"; // Import User model
import Post from "../models/post.model.js"; // Import Post model
import { v2 as cloudinary } from "cloudinary"; // Import Cloudinary for image uploads
import Notification from "../models/notification.model.js"; // Import Notification model
import { populate } from "dotenv";
export const createPost = async (req, res) => {
  // Function to create a new post
  try {
    const { text } = req.body; // Extract text from the request body
    let { img } = req.body; // Extract img from the request body
    const userId = req.user._id.toString(); // Ensure userId is a string
    const user = await User.findById(userId); // Fetch the user by ID
    if (!user) {
      // Check if the user exists
      console.log("User not found");
      return res.status(404).json({ error: "User not found" });
    }
    if (!text && !img) {
      // Ensure at least one of text or img is provided
      return res.status(400).json({ error: "Text or image is required" });
    }
    if (img) {
      // If an image is provided, upload it to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(img, {
        folder: "posts", // Specify the folder in Cloudinary
      });
      img = uploadResponse.secure_url; // Get the secure URL of the uploaded image
    }
    const newPost = new Post({
      // Create a new post
      user: userId, // Use the user ID from the request
      text, // Use the text from the request body
      img, // Use the image from the request body
    });

    await newPost.save(); // Save the new post to the database
    res.status(201).json(newPost); // Respond with the created post
  } catch (error) {
    console.log("Error in createPost: ", error.message);
    res.status(500).json({ error: error.message });
  }
};
export const deletePost = async (req, res) => {
  // Function to delete a post
  try {
    const postId = req.params.id; // Get the post ID from the request parameters
    const post = await Post.findById(postId); // Find the post by ID
    if (!post) {
      // Check if the post exists
      return res.status(404).json({ error: "Post not found" });
    }
    if (post.user.toString() !== req.user._id.toString()) {
      // Check if the user is authorized to delete the post
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this post" });
    }
    if (post.img) {
      // If the post has an image, delete it from Cloudinary
      const imgId = post.img.split("/").pop().split(".")[0]; // Extract the public ID from the image URL
      await cloudinary.uploader.destroy(imgId); // Delete the image from Cloudinary
    }
    await Post.findByIdAndDelete(req.params.id); // Delete the post from the database
    res.status(200).json({ message: "Post deleted successfully" }); // Respond with success message
  } catch (error) {
    console.log("Error in deletePost: ", error.message);
    res.status(500).json({ error: error.message });
  }
};
export const commentPosts = async (req, res) => {
  // Function to comment on a post
  try {
    const postId = req.params.id; // Get the post ID from the request parameters
    const { text } = req.body; // Extract text from the request body
    if (!text) {
      // Ensure text is provided
      return res.status(400).json({ error: "Comment text is required" });
    }
    const post = await Post.findById(postId); // Find the post by ID
    if (!post) {
      // Check if the post exists
      return res.status(404).json({ error: "Post not found" });
    }
    const comment = {
      text, // Use the text from the request body
      user: req.user._id, // Use the user ID from the request
    };
    post.Comments.push(comment); // Add the comment to the post's comments array
    await post.save(); // Save the updated post to the database
    res.status(200).json(post); // Respond with the updated post
  } catch (error) {
    console.log("Error in commentPosts: ", error.message);
    res.status(500).json({ error: error.message });
  }
};
export const likeUnlikePost = async (req, res) => {
  // Function to like or unlike a post
  try {
    const userId = req.user._id;
    // Get the user ID from the request
    const { id: postId } = req.params; // Get the post ID from the request parameters

    const post = await Post.findById(postId); // Find the post by ID
    if (!post) {
      // Check if the post exists
      return res.status(404).json({ error: "Post not found" });
    }
    // Get the user ID from the request
    const userLikePost = post.like.includes(userId); // Check if the post is already liked
    if (userLikePost) {
      await Post.findByIdAndUpdate(
        postId,
        { $pull: { like: userId } },
        { new: true }
      );
      await user.findByIdAndUpdate(
        userId,
        { $pull: { likes: postId } },
        { new: true }
      ); // Remove the like from the post and user
      return res.status(200).json({ message: "Post unliked successfully" });
    } else {
      post.like.push(userId);
      await User.findByIdAndUpdate(
        userId,
        { $addToSet: { likes: postId } },
        { new: true }
      ); // Add the like to the post and user
      await post.save();

      const notification = new Notification({
        type: "like",
        from: userId,
        to: post.user,
        post: postId,
      });

      await notification.save();

      return res.status(200).json({ message: "Post liked successfully" });
    }

    // Respond with the updated post
  } catch (error) {
    console.log("Error in likeUnlikePost: ", error.message);
    res.status(500).json({ error: error.message });
  }
};
export const getAllPosts = async (req, res) => {
  // Function to get all posts
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-password", // Populate user details
      }) // Sort posts by creation date in descending order
      .populate({
        path: "Comments.user",
        select: "-password", // Populate user details for comments
      });
    if (!posts || posts.length === 0) {
      // Check if there are no posts
      return res.status(404).json({ message: "No posts found" });
    }
    res.status(200).json(posts); // Respond with the list of posts
  } catch (error) {
    console.log("Error in getAllPosts: ", error.message);
    res.status(500).json({ error: error.message });
  }
};
export const getlikedPosts = async (req, res) => {
  // Function to get liked posts of the current user
  try {
    const userId = req.params._id; // Get the user ID from the request
    if (!user) {
      // Check if the user exists
      return res.status(404).json({ error: "User not found" });
    }
    const likedPosts = await post
      .find({ _id: { $in: user.likedPosts } })
      .populate({
        path: "user",
        select: "-password", // Populate user details
      })
      .populate({
        path: "Comments.user",
        select: "-password", // Populate user details for comments
      });

    res.status(200).json(user.likedPosts); // Respond with the user's liked posts
  } catch (error) {
    console.log("Error in getlikedPosts: ", error.message);
    res.status(500).json({ error: error.message });
  }
};
export const getFollowingPosts = async (req, res) => {
  // Function to get posts from users that the current user is following
  try {
    // Get the user ID from the request
    const currentUser = await User.findById(req.user._id); // Get the current user
    if (!currentUser) {
      // Check if the current user exists
      return res.status(404).json({ error: "User not found" });
    }
    const following = currentUser.following; // Get the list of users that the current user is following
    const posts = await Post.find({ user: { $in: following } }) // Find posts from users that the current user is following
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-password", // Populate user details
      })
      .populate({
        path: "Comments.user",
        select: "-password", // Populate user details for comments
      });
    res.status(200).json(posts); // Respond with the list of posts from followed users
  } catch (error) {
    console.log("Error in getFollowingPosts: ", error.message);
    res.status(500).json({ error: error.message });
  }
};

// This code defines the functions for creating, deleting, commenting on, liking/unliking, and retrieving posts.
// It uses Mongoose to interact with the MongoDB database and Cloudinary for image uploads.
// The functions handle various operations related to posts in a social media application, including error handling and response formatting.
// The functions are exported for use in the routes file, allowing the application to handle post-related
// operations such as creating posts, commenting on posts, liking/unliking posts, deleting posts, and retrieving all posts or posts from followed users.
// The code also includes error handling to ensure that appropriate responses are sent in case of errors,
// such as when a post or user is not found, or when there is an issue with the database operations.
