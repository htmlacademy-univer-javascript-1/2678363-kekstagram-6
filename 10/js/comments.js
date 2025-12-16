import { getRandomArrayElement, getRandomNumber } from './util.js';
import { MESSAGE, NAMES } from './data.js';
import { MAX_COMMENTS_COUNT } from './data.js';

function createAvatar() {
  return `img/avatar-${getRandomNumber(1, 6)}.svg`;
}

function createMessage() {
  const commentsCount = getRandomNumber(1, 2);
  const randomComments = [...MESSAGE].sort(() => 0.5 - Math.random());
  return randomComments.slice(0, commentsCount).join(' ');
}

function createName() {
  return getRandomArrayElement(NAMES);
}

let commentIdCounter = 1;

const createComments = () => {
  const commentCount = getRandomNumber(0, MAX_COMMENTS_COUNT);
  const commentArray = [];

  for (let i = 0; i < commentCount; i++) {
    commentArray.push({
      id: commentIdCounter++,
      avatar: createAvatar(),
      message: createMessage(),
      name: createName()
    });
  }

  return commentArray;
};

export { createComments };
