function getRandomNumber(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArrayElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export { getRandomArrayElement, getRandomNumber };
