import { createComment } from './createComment';
import { createPost } from './createPost';
import { deleteComment } from './deleteComment';
import { deletePost } from './deletePost';
import { getComments } from './getComments';
import { getFeedPosts } from './getFeedPosts';
import { getPost } from './getPost';
import { getUserPosts } from './getUserPosts';
import { toggleHeart } from './toggleHeart';
import { updatePost } from './updatePost';

export const postApi = {
  createPost,
  getPost,
  updatePost,
  toggleHeart,
  getComments,
  createComment,
  deleteComment,
  deletePost,
  getUserPosts,
  getFeedPosts,
};

export {
  createComment,
  createPost,
  deleteComment,
  deletePost,
  getComments,
  getFeedPosts,
  getPost,
  getUserPosts,
  toggleHeart,
  updatePost,
};
