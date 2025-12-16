import { MAX_HASHTAGS_COUNT, MAX_HASHTAG_LENGTH, MAX_COMMENT_LENGTH, REGEXP } from './data.js';

const uploadForm = document.querySelector('#upload-select-image');
const uploadFile = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
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

const resetForm = () => {
  uploadForm.reset();
  uploadFile.value = '';
  pristine.reset();
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

const normalizeHashtags = (hashtagsString) => hashtagsString
  .trim()
  .toLowerCase()
  .split(' ')
  .filter((tag) => tag.length > 0);

const validateHashtagFormat = (value) => {
  if (!value.trim()) {
    return true;
  }
  const hashtags = normalizeHashtags(value);
  return hashtags.every((hashtag) => REGEXP.test(hashtag));
};

const validateHashtagLength = (value) => {
  if (!value.trim()) {
    return true;
  }
  const hashtags = normalizeHashtags(value);
  return hashtags.every((hashtag) => hashtag.length <= MAX_HASHTAG_LENGTH);
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
  const hashtags = normalizeHashtags(value);
  const uniqueHashtags = new Set(hashtags);
  return hashtags.length === uniqueHashtags.size;
};

const validateCommentLength = (value) => value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(
  hashtagsInput,
  validateHashtagFormat,
  'Хэштег должен начинаться с # и содержать только буквы и цифры',
  2,
  false
);

pristine.addValidator(
  hashtagsInput,
  validateHashtagLength,
  `Максимальная длина хэштега: ${MAX_HASHTAG_LENGTH} символов`,
  3,
  false
);

pristine.addValidator(
  hashtagsInput,
  validateHashtagCount,
  `Нельзя указать больше ${MAX_HASHTAGS_COUNT} хэштегов`,
  1,
  false
);

pristine.addValidator(
  hashtagsInput,
  validateUniqueHashtag,
  'Хэштеги не должны повторяться',
  1,
  false
);

pristine.addValidator(
  commentInput,
  validateCommentLength,
  `Длина комментария не должна превышать ${MAX_COMMENT_LENGTH} символов`,
  2,
  false
);

uploadFile.addEventListener('change', () => {
  toggleForm(true);
});

uploadCancel.addEventListener('click', () => {
  toggleForm(false);
});

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape' && isFormOpen) {
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

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();

  if (isValid) {
    blockSubmitButton();

    uploadForm.submit();

    setTimeout(() => {
      unblockSubmitButton();
    }, 3000);
  }
});

export { toggleForm, resetForm, pristine };
