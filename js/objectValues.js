import { getRandomNumber, getRandomArrayElement } from './util.js';
import { DESCRIPTIONS } from './data.js';

function createLikes() {
  return getRandomNumber(15, 200);
}

function createUrl(urlNum) {
  return `photos/${urlNum}.jpg`;
}

function createDescription() {
  return getRandomArrayElement(DESCRIPTIONS);
}

export { createLikes, createUrl, createDescription };
