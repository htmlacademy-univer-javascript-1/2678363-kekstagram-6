const EFFECTS = {
  none: '',
  chrome: 'grayscale(1)',
  sepia: 'sepia(1)',
  marvin: 'invert(100%)',
  phobos: 'blur(3px)',
  heat: 'brightness(1.3) saturate(1.5)'
};

const initializeImageEffects = (previewImg) => {
  const effectRadios = document.querySelectorAll('.effects__radio');
  const effectLevelContainer = document.querySelector('.img-upload__effect-level');

  const applyEffect = (effect) => {
    previewImg.style.filter = EFFECTS[effect] || '';

    if (effect === 'none') {
      effectLevelContainer.classList.add('hidden');
    } else {
      effectLevelContainer.classList.remove('hidden');
    }
  };

  effectRadios.forEach((radio) => {
    radio.addEventListener('change', () => {
      if (radio.checked) {
        applyEffect(radio.value);
      }
    });
  });

  const resetEffects = () => {
    applyEffect('none');
  };

  applyEffect('none');

  return { resetEffects };
};

export { initializeImageEffects };
