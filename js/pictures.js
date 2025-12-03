import { createLikes, createUrl, createDescription } from "./objectValues";
import { createPosts, objectsArray } from "./main";

const picturesContainer = document.querySelector(".pictures");
const picturesTemplate = document.querySelector("#picture").content;
const pictureImg = picturesTemplate.querySelector(".picture__img");
const pictureLikes = picturesTemplate.querySelector(".picture__likes");
const pictureComments = picturesTemplate.querySelector(".picture__comments");

const createPictures = function() {
  pictureImg.src = objectsArray.url;
  pictureImg.alt = objectsArray.description;
  pictureLikes.textContent = createDescription();
  pictureComments.textContent =
};

createPictures();


// const createPicture = function() {
//   url: ;
//   description: ;
//   likes: ;
//   comments: ;
// }

// const fragment = new DocumentFragment();

// similarPictures.forEach((url, description, likes, comments) => {
//   const pictureElement = picturesTemplate.cloneNode(true);
//   pictureElement.querySelector('.')
// });

// similarWizards.forEach(({name, coatColor, eyesColor}) => {
//   const wizardElement = similarWizardTemplate.cloneNode(true);
//   wizardElement.querySelector('.setup-similar-label').textContent = name;
//   wizardElement.querySelector('.wizard-coat').style.fill = coatColor;
//   wizardElement.querySelector('.wizard-eyes').style.fill = eyesColor;
//   similarListFragment.appendChild(wizardElement);
// });
