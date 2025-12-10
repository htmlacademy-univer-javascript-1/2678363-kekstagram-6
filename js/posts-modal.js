import { COMMENTS_PER_PAGE } from "./data.js";

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsContainer = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');

const commentsCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoaderButton = bigPicture.querySelector('.comments-loader');
const closeButton = bigPicture.querySelector('#picture-cancel');

const currentComments = [1, 2, 3, 4];
let commentsShown = 0;

const showMoreComments = () => {
  commentsCountBlock.textContent = `${commentsShown} + из ${currentComments.length}`;
}
console.log(showMoreComments());

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

const renderComments = (comments) => {
  commentsContainer.innerHTML = '';
  const fragment = new DocumentFragment();

  comments.forEach((comment) => {
    const commentsItem = createComment(comment);
    fragment.appendChild(commentsItem);
  });

  commentsContainer.appendChild(fragment);
};

const showPost = (pictureData) => {
  bigPictureImage.src = pictureData.url;
  bigPictureImage.alt = pictureData.description;
  likesCount.textContent = pictureData.likes;
  commentsCount.textContent = pictureData.comments.length;
  socialCaption.textContent = pictureData.description;

  commentsCountBlock.classList.add('hidden');
  commentsLoaderButton.classList.add('hidden');

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  renderComments(pictureData.comments);
};

const closePost = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
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
  }

  document.addEventListener('keydown', onEscapeClick);
  bigPicture.addEventListener('click', onOverlayClick);
  closeButton.addEventListener('click', closePost);

  isInitialized = true;
};

export { showPost, initializePost };
