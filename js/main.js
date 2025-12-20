import { createPosts } from './create-posts.js';
import { renderPictures } from './pictures.js';
import { initializePost } from './posts-modal.js';
import './form-validation.js';
import { getPosts } from './server-interaction.js';

createPosts();
renderPictures();
initializePost();
getPosts();


