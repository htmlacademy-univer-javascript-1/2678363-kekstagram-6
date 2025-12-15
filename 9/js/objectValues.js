import { getRandomNumber, getRandomArrayElement } from './util.js';
import { DESCRIPTIONS, MIN_LIKES_COUNT, MAX_LIKES_COUNT } from './data.js';

function createLikes() {
  return getRandomNumber(MIN_LIKES_COUNT, MAX_LIKES_COUNT);
}

function createUrl(urlNum) {
  return `photos/${urlNum}.jpg`;
}

function createDescription() {
  return getRandomArrayElement(DESCRIPTIONS);
}

export { createLikes, createUrl, createDescription };
