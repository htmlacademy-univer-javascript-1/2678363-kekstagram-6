import { createComments } from './comments.js';
import { createUrl, createDescription, createLikes } from './objectValues.js';

const objectsArray = [];

const createObjectsArray = () => {
  for (let i = 1; i <= 25; i++) {
    objectsArray.push({
      id: i,
      url: createUrl(i),
      description: createDescription(),
      likes: createLikes(),
      comments: createComments()
    });
  }
  return objectsArray;
};

createObjectsArray();
