import { MAX_SCALE, MIN_SCALE, SCALE_STEP } from './data.js';

const initializeImageScale = (previewImg, scaleValueInput) => {
  let currentScale = MAX_SCALE;

  const updateScale = (newScale) => {
    currentScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, newScale));
    scaleValueInput.value = `${currentScale}%`;
    previewImg.style.transform = `scale(${currentScale / 100})`;
  };

  const scaleSmaller = document.querySelector('.scale__control--smaller');
  const scaleBigger = document.querySelector('.scale__control--bigger');

  scaleSmaller.addEventListener('click', () => {
    updateScale(currentScale - SCALE_STEP);
  });

  scaleBigger.addEventListener('click', () => {
    updateScale(currentScale + SCALE_STEP);
  });

  const resetScale = () => {
    updateScale(MAX_SCALE);
  };

  return { resetScale };
};

export { initializeImageScale };
