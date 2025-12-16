import { COMMENTS_PER_PAGE } from './data.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsContainer = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');

const commentsCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoaderButton = bigPicture.querySelector('.comments-loader');
const closeButton = bigPicture.querySelector('#picture-cancel');

let currentComments = [];
let commentsShown = 0;

const updateCommentsCounter = () => {
  commentsCountBlock.innerHTML = `${commentsShown} из <span class="comments-count">${currentComments.length}</span> комментариев`;
  if (commentsShown === 0) {
    commentsCountBlock.innerHTML = 'Нет комментариев';
  }
};

const createComment = (comment) => {
  const commentsItem = document.createElement('li');
  commentsItem.classList.add('social__comment');

  const avatarImage = document.createElement('img');
  avatarImage.classList.add('social__picture');
  avatarImage.src = comment.avatar;
  avatarImage.alt = comment.name;
  avatarImage.width = 35;
  avatarImage.height = 35;

  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = comment.message;

  commentsItem.appendChild(avatarImage);
  commentsItem.appendChild(commentText);

  return commentsItem;
};

const renderComments = () => {
  const commentsToShow = currentComments.slice(commentsShown, commentsShown + COMMENTS_PER_PAGE);

  const fragment = new DocumentFragment();
  commentsToShow.forEach((comment) => {
    const commentsElement = createComment(comment);
    fragment.appendChild(commentsElement);
  });

  commentsContainer.appendChild(fragment);
  commentsShown += commentsToShow.length;

  updateCommentsCounter();

  if (commentsShown >= currentComments.length) {
    commentsLoaderButton.classList.add('hidden');
  }
};

const showPost = (pictureData) => {
  commentsShown = 0;
  commentsContainer.innerHTML = '';
  currentComments = pictureData.comments;

  bigPictureImage.src = pictureData.url;
  bigPictureImage.alt = pictureData.description;
  likesCount.textContent = pictureData.likes;
  commentsCount.textContent = currentComments.length;
  socialCaption.textContent = pictureData.description;

  commentsCountBlock.classList.remove('hidden');
  commentsLoaderButton.classList.remove('hidden');

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  if (currentComments.length >= 0) {
    renderComments();
  }

};

const closePost = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const onCommentsLoaderClick = () => {
  renderComments();
};

const onEscapeClick = (evt) => {
  if (evt.key === 'Escape' && !bigPicture.classList.contains('hidden')) {
    evt.preventDefault();
    closePost();
  }
};

const onOverlayClick = (evt) => {
  if (evt.target === bigPicture) {
    closePost();
  }
};

let isInitialized = false;

const initializePost = () => {
  if (isInitialized) {
    document.removeEventListener('keydown', onEscapeClick);
    bigPicture.removeEventListener('click', onOverlayClick);
    closeButton.removeEventListener('click', closePost);
    commentsLoaderButton.removeEventListener('click', onCommentsLoaderClick);
  }

  document.addEventListener('keydown', onEscapeClick);
  bigPicture.addEventListener('click', onOverlayClick);
  closeButton.addEventListener('click', closePost);
  commentsLoaderButton.addEventListener('click', onCommentsLoaderClick);

  isInitialized = true;
};

export { showPost, initializePost };
