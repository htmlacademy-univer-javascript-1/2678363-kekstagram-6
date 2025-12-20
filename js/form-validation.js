import { MAX_HASHTAGS_COUNT, MAX_COMMENT_LENGTH, REGEXP } from './data.js';
import { sendPosts } from './api.js';

const uploadForm = document.querySelector('#upload-select-image');
const uploadFile = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('#upload-cancel');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');
const submitButton = uploadForm.querySelector('#upload-submit');

let isFormOpen = false;

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
  0,
  true
);

pristine.addValidator(
  hashtagsInput,
  validateUniqueHashtag,
  'Хэштеги не должны повторяться',
  1,
  false
);

pristine.addValidator(
  hashtagsInput,
  validateHashtagCount,
  'Превышено количество хэш-тегов',
  2,
  false
);

pristine.addValidator(
  commentInput,
  validateCommentLength,
  `Длина комментария не должна превышать ${MAX_COMMENT_LENGTH} символов`,
  0,
  false
);

const resetForm = () => {
  uploadForm.reset();
  uploadFile.value = '';
  pristine.reset();

  const scaleValueInput = uploadOverlay.querySelector('.scale__control--value');
  scaleValueInput.value = '100%';

  const previewImg = uploadOverlay.querySelector('.img-upload__preview img');
  previewImg.src = 'img/upload-default-image.jpg';
  previewImg.style.transform = 'scale(1)';
  previewImg.style.filter = '';

  const originalEffectRadio = uploadOverlay.querySelector('#effect-none');
  if (originalEffectRadio) {
    originalEffectRadio.checked = true;
  }

  const effectLevelContainer = uploadOverlay.querySelector('.img-upload__effect-level');
  if (effectLevelContainer) {
    effectLevelContainer.classList.add('hidden');
  }
};

const toggleForm = (show) => {
  if (show) {
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

uploadFile.addEventListener('change', () => {
  toggleForm(true);
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
    const successButton = successElement.querySelector('.success__button');

    toggleForm(false);
    successButton.addEventListener('click', () => {
      successElement.remove();
    });

    document.body.appendChild(successElement);
  } catch (error) {
    const errorTemplate = document.querySelector('#error');
    const errorElement = errorTemplate.content.cloneNode(true).children[0];
    errorElement.style.zIndex = 100;

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
      if (errorElement.parentNode) {
        errorElement.remove();
      }

      document.addEventListener('keydown', originalKeydownHandler);
      document.removeEventListener('keydown', onEscapeKeydown);
      errorElement.removeEventListener('click', onOverlayClick);
    };

    const retryButton = errorElement.querySelector('.error__button');
    retryButton.addEventListener('click', (e) => {
      e.stopPropagation();
      removeError();
    });

    document.addEventListener('keydown', onEscapeKeydown);
    errorElement.addEventListener('click', onOverlayClick);

    document.body.appendChild(errorElement);
  } finally {
    unblockSubmitButton();
  }
});

export { toggleForm, resetForm, pristine };
