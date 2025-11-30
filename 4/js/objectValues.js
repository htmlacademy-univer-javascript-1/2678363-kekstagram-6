import { getRandomNumber, getRandomArrayElement } from './util.js';
import { descriptions } from './data.js';

function createLikes() {
  return getRandomNumber(15, 200);
}

function createUrl(urlNum) {
  return `photos/${urlNum}.jpg`;
}

function createDescription() {
  return getRandomArrayElement(descriptions);
}

export { createLikes, createUrl, createDescription };
