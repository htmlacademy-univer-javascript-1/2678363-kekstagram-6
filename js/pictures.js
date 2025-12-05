import { objectsArray } from './main.js';

const createpicture = (pictureData) => {
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

  return picture;
};

const renderPictures = () => {
  const picturesContainer = document.querySelector('.pictures');
  const fragment = new DocumentFragment();

  objectsArray.forEach((pictureData) => {
    const pictureItem = createpicture(pictureData);
    fragment.appendChild(pictureItem);
  });

  picturesContainer.appendChild(fragment);
};

export { renderPictures };
