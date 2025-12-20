import './form-validation.js';
import { getPosts } from './api.js';
import { showAlert } from './util.js';
import { renderPictures } from './pictures.js';
import { initializePost } from './post-modal.js';

initializePost();
getPosts()
  .then((posts) => renderPictures(posts))
  .catch((error) => showAlert(error.message));
