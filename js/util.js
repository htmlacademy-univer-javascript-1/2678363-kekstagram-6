function getRandomNumber(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArrayElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const isEscapeKey = (evt) => evt.key === 'Escape';

export { getRandomArrayElement, getRandomNumber, isEscapeKey };
