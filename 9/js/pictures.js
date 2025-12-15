import { userPosts } from './main.js';
import { showPost } from './posts-modal.js';

const createPicture = (pictureData) => {
  const pictureTemplate = document.querySelector('#picture');
  const picture = pictureTemplate.content.querySelector('.picture').cloneNode(true);

  const image = picture.querySelector('.picture__img');
  const likesElement = picture.querySelector('.picture__likes');
  const commentsElement = picture.querySelector('.picture__comments');

  image.src = pictureData.url;
  image.alt = pictureData.description;
  likesElement.textContent = pictureData.likes;

  const commentsCount = pictureData.comments ? pictureData.comments.length : 0;
  commentsElement.textContent = commentsCount;

  picture.addEventListener('click', (evt) => {
    evt.preventDefault();
    showPost(pictureData);
  });

  return picture;
};

const renderPictures = () => {
  const picturesContainer = document.querySelector('.pictures');
  const fragment = new DocumentFragment();

  userPosts.forEach((pictureData) => {
    const pictureItem = createPicture(pictureData);
    fragment.appendChild(pictureItem);
  });

  picturesContainer.appendChild(fragment);
};

export { renderPictures };
