import { createComments } from './comments.js';
import { createUrl, createDescription, createLikes } from './objectValues.js';
import { MAX_POSTS_COUNT } from './data.js';

const userPosts = [];

const createPosts = () => {
  for (let i = 1; i <= MAX_POSTS_COUNT; i++) {
    userPosts.push({
      id: i,
      url: createUrl(i),
      description: createDescription(),
      likes: createLikes(),
      comments: createComments()
    });
  }
  return userPosts;
};

export { userPosts, createPosts };
