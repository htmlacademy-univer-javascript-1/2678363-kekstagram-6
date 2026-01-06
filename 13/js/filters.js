import { MAX_UNIQUE_PICTURES, RERENDER_DELAY } from './data.js';
import { renderPictures } from './pictures.js';

const FILTERS = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const filtersContainer = document.querySelector('.img-filters');

const filterButtons = {
  default: document.querySelector(`#${FILTERS.DEFAULT}`),
  random: document.querySelector(`#${FILTERS.RANDOM}`),
  discussed: document.querySelector(`#${FILTERS.DISCUSSED}`)
};

let currentPosts = [];

function debounce(callback, timeoutDelay) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

const getFilteredPosts = (posts, filter) => {
  switch (filter) {
    case FILTERS.RANDOM:
      return [...posts].sort(() => 0.5 - Math.random()).slice(0, MAX_UNIQUE_PICTURES);
    case FILTERS.DISCUSSED:
      return [...posts].sort((a, b) => b.comments.length - a.comments.length);
    default:
      return [...posts];
  }
};

const renderFilteredPosts = debounce((filter) => {
  const filteredPosts = getFilteredPosts(currentPosts, filter);
  renderPictures(filteredPosts);
}, RERENDER_DELAY);

const onFilterClick = (filter) => {
  Object.values(filterButtons).forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });

  const buttonName = Object.keys(FILTERS).find((key) => FILTERS[key] === filter);
  if (buttonName && filterButtons[buttonName]) {
    filterButtons[buttonName].classList.add('img-filters__button--active');
  }

  renderFilteredPosts(filter);
};

const initializeFilters = (posts) => {
  currentPosts = posts;

  filtersContainer.classList.remove('img-filters--inactive');

  filterButtons.default.addEventListener('click', () => onFilterClick(FILTERS.DEFAULT));
  filterButtons.random.addEventListener('click', () => onFilterClick(FILTERS.RANDOM));
  filterButtons.discussed.addEventListener('click', () => onFilterClick(FILTERS.DISCUSSED));
};

export { initializeFilters };
