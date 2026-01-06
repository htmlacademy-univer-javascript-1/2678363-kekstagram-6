import { MAX_HASHTAGS_COUNT, MAX_COMMENT_LENGTH, REGEXP } from './data.js';
import { sendPosts } from './api.js';
import { initializeImageScale } from './image-scale.js';
import { initializeImageEffects } from './image-effects.js';

const uploadForm = document.querySelector('#upload-select-image');
const uploadFile = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('#upload-cancel');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');
const submitButton = uploadForm.querySelector('#upload-submit');
const previewImg = uploadOverlay.querySelector('.img-upload__preview img');
const scaleValueInput = uploadOverlay.querySelector('.scale__control--value');

let isFormOpen = false;
let scaleModule;
let effectsModule;

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'has-error',
  successClass: 'has-success',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'form__error-text'
});

const normalizeHashtags = (value) => value
  .trim()
  .split(/\s+/)
  .filter((hashtag) => hashtag.length > 0);

const validateHashtagFormat = (value) => {
  if (!value.trim()) {
    return true;
  }

  const hashtags = normalizeHashtags(value);
  return hashtags.every((hashtag) => REGEXP.test(hashtag));
};

const validateHashtagCount = (value) => {
  if (!value.trim()) {
    return true;
  }

  const hashtags = normalizeHashtags(value);
  return hashtags.length <= MAX_HASHTAGS_COUNT;
};

const validateUniqueHashtag = (value) => {
  if (!value.trim()) {
    return true;
  }

  const hashtags = normalizeHashtags(value).map((hashtag) => hashtag.toLowerCase());
  const uniqueTags = [...new Set(hashtags)];
  return hashtags.length === uniqueTags.length;
};

const validateCommentLength = (value) => value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(
  hashtagsInput,
  validateHashtagFormat,
  'Введён невалидный хэш-тег',
  1,
  true
);

pristine.addValidator(
  hashtagsInput,
  validateUniqueHashtag,
  'Хэштеги не должны повторяться',
  2,
  false
);

pristine.addValidator(
  hashtagsInput,
  validateHashtagCount,
  'Превышено количество хэш-тегов',
  3,
  false
);

pristine.addValidator(
  commentInput,
  validateCommentLength,
  `Длина комментария не должна превышать ${MAX_COMMENT_LENGTH} символов`,
  1,
  false
);

let currentImageURL = null;

const resetForm = () => {
  uploadForm.reset();
  uploadFile.value = '';
  pristine.reset();

  if (currentImageURL) {
    URL.revokeObjectURL(currentImageURL);
    currentImageURL = null;
  }

  if (scaleModule) {
    scaleModule.resetScale();
  }
  if (effectsModule) {
    effectsModule.resetEffects();
  }

  previewImg.src = 'img/upload-default-image.jpg';

  const originalEffectRadio = uploadOverlay.querySelector('#effect-none');
  if (originalEffectRadio) {
    originalEffectRadio.checked = true;
  }

  const effectLevelContainer = uploadOverlay.querySelector('.img-upload__effect-level');
  if (effectLevelContainer) {
    effectLevelContainer.classList.add('hidden');
  }
};

const toggleForm = (isShown) => {
  if (isShown) {
    uploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    isFormOpen = true;
  } else {
    uploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    isFormOpen = false;
    resetForm();
  }
};

uploadFile.addEventListener('change', (evt) => {
  const file = evt.target.files[0];
  if (file) {
    if (currentImageURL) {
      URL.revokeObjectURL(currentImageURL);
    }
    currentImageURL = URL.createObjectURL(file);
    previewImg.src = currentImageURL;

    if (!scaleModule) {
      scaleModule = initializeImageScale(previewImg, scaleValueInput);
    }
    if (!effectsModule) {
      effectsModule = initializeImageEffects(previewImg);
    }

    scaleModule.resetScale();
    effectsModule.resetEffects();

    toggleForm(true);
  }
});

closeButton.addEventListener('click', () => {
  toggleForm(false);
});

const onDocumentKeydown = (evt) => {
  const isTextFieldFocused = document.activeElement === hashtagsInput || document.activeElement === commentInput;

  if (evt.key === 'Escape' && isFormOpen && !isTextFieldFocused) {
    evt.preventDefault();
    toggleForm(false);
  }
};

document.addEventListener('keydown', onDocumentKeydown);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправка...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

uploadForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (!isValid) {
    return;
  }

  blockSubmitButton();

  const formData = new FormData(uploadForm);

  try {
    await sendPosts(formData);

    const successTemplate = document.querySelector('#success');
    const successElement = successTemplate.content.cloneNode(true).children[0];
    const successInner = successElement.querySelector('.success__inner');
    const successButton = successElement.querySelector('.success__button');

    let removeSuccess = function () { };

    const onEscapeKeydown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        removeSuccess();
      }
    };

    const onOverlayClick = (e) => {
      if (!successInner.contains(e.target)) {
        removeSuccess();
      }
    };

    removeSuccess = () => {
      successElement.remove();

      document.removeEventListener('keydown', onEscapeKeydown);
      document.removeEventListener('click', onOverlayClick);
    };

    successButton.addEventListener('click', removeSuccess);
    document.addEventListener('keydown', onEscapeKeydown);
    document.addEventListener('click', onOverlayClick);

    document.body.appendChild(successElement);

    toggleForm(false);

  } catch (error) {

    const errorTemplate = document.querySelector('#error');
    const errorElement = errorTemplate.content.cloneNode(true).children[0];

    const originalKeydownHandler = onDocumentKeydown;
    document.removeEventListener('keydown', originalKeydownHandler);

    let removeError = function () { };

    const onEscapeKeydown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        removeError();
      }
    };

    const onOverlayClick = (e) => {
      if (e.target === errorElement) {
        removeError();
      }
    };

    removeError = () => {
      errorElement.remove();

      document.addEventListener('keydown', originalKeydownHandler);
      document.removeEventListener('keydown', onEscapeKeydown);
      document.removeEventListener('click', onOverlayClick);
    };

    const retryButton = errorElement.querySelector('.error__button');
    retryButton.addEventListener('click', (e) => {
      e.stopPropagation();
      removeError();
    });

    document.addEventListener('keydown', onEscapeKeydown);
    document.addEventListener('click', onOverlayClick);

    document.body.appendChild(errorElement);
  } finally {
    unblockSubmitButton();
  }
});

export { toggleForm, resetForm, pristine };
