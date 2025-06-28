import express from "express";
import {
  createPost,
  commentPosts,
  likeUnlikePost,
  deletePost,
  getAllPosts,
  getFollowingPosts,
  getlikedPosts,
} from "../controllers/post.controller.js";
import { protectRoute } from "../middleware/protectRoutes.js";
const router = express.Router();
router.get("/likes", protectRoute, getlikedPosts); // Get all posts
router.get("/all", protectRoute, getAllPosts); // Assuming you have a function to get all posts
router.get("/following", protectRoute, getFollowingPosts);
router.post("/create", protectRoute, createPost);
router.post("/comment/:id", protectRoute, commentPosts);
router.post("/like/:id", protectRoute, likeUnlikePost);
router.delete("/:id", protectRoute, deletePost);
export default router;
// This code defines the routes for creating, retrieving, liking/unliking, and deleting posts.
// It uses Express.js to set up the routes and middleware for protecting the routes.
// The `protectRoute` middleware ensures that only authenticated users can access these routes.
// The routes are then exported for use in the main server file.
// This code is part of a backend application that handles post-related operations in a social media context.
// It allows users to create posts, retrieve posts, like or unlike posts, and delete posts
// while ensuring that only authenticated users can perform these actions.
// The routes are defined using Express.js and are protected by middleware to ensure that only authenticated users can access them.
// This code is part of a backend application that handles post-related operations in a social media context.
// It allows users to create posts, retrieve posts, like or unlike posts, and delete posts
// while ensuring that only authenticated users can perform these actions.
// The routes are defined using Express.js and are protected by middleware to ensure that only authenticated users can access them.
// The routes are then exported for use in the main server file, allowing the application to handle post-related operations.
// This code is part of a backend application that handles post-related operations in a social media context
// allowing users to create posts, retrieve posts, like or unlike posts, and delete posts.
// The routes are defined using Express.js and are protected by middleware to ensure that only authenticated users
// can access them. The routes are then exported for use in the main server file, allowing the application to handle post-related operations.
// This code is part of a backend application that handles post-related operations in a social media context
// allowing users to create posts, retrieve posts, like or unlike posts, and delete posts.
// The routes are defined using Express.js and are protected by middleware to ensure that only authenticated users
// can access them. The routes are then exported for use in the main server file, allowing the application to handle post-related operations.
// This code is part of a backend application that handles post-related operations in a social media context
// allowing users to create posts, retrieve posts, like or unlike posts, and delete posts.
// The routes are defined using Express.js and are protected by middleware to ensure that only authenticated users
// can access them. The routes are then exported for use in the main server file, allowing the application to handle post-related operations.
// This code is part of a backend application that handles post-related operations in a social media context
// allowing users to create posts, retrieve posts, like or unlike posts, and delete posts.
// The routes are defined using Express.js and are protected by middleware to ensure that only authenticated users
// can access them. The routes are then exported for use in the main server file, allowing
// the application to handle post-related operations.
// This code is part of a backend application that handles post-related operations in a social media context
// allowing users to create posts, retrieve posts, like or unlike posts, and delete posts.
