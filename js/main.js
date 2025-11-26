function createPhotoId() {
  for (let photoId = 1; photoId <= 25; photoId++) {
    return photoId;
  }
}

function createUrl() {
  for (let i = 1; i <= 25; i++) {
    return `photos/${i}.jpg`;
  }
}

const descriptions = ['Логотип Контура', 'Колокольчик', 'Мороженка', 'Батерфляй', 'Снежок', 'Бибика']

function createDescription() {

}

function getRandomLikes(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createLikes() {
  for (let i = 0; i <= 25; i++) {
    return getRandomLikes(15, 200);
  }
}

const comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
]

function createCommentId() {
  for (let commentId = 1; commentId <= 25; commentId++) {
    return commentId;
  }
}

function getAvatar(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createAvatar() {
  for (let i = 1; i <= 25; i++) {
    return `img/avatar-${getAvatar(1, 6)}.svg`;
  }
}

function createMessage() {

}

const names = ['Саша Симпл', 'Бивис', 'Баттхед', 'Эрик Картман', 'Конь БоДжек', 'Принцесса Бубльгум']
const randomName = Math.floor(Math.random() * 6);
function getRandomName() {
  for (let i = 0; i < names.length; i++)
  return names[randomName];
}

function createName() {
  for (let i = 1; i <= 25; i++) {
    console.log(getRandomName());
  }
}

function createComments() {
  return {}
}

function getRandomComments(arr, num) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

function getQuantityOfComments() {
  return Math.floor(Math.random() * 2) + 1;
}

const randomItems = getRandomComments(comments, getQuantityOfComments());
console.log(randomItems);

// function getRandomInRange(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// for (let i = 1; i <= 5; i++) {
//   console.log(getRandomInRange(1, 10));
// }
