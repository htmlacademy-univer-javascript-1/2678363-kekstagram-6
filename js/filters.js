import { MAX_UNIQUE_PICTURES, RERENDER_DELAY } from './data.js';

const FILTERS = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

let currentPosts = [];
let currentFilter = FILTERS.DEFAULT;
const filtersContainer = document.querySelector('.img-filters');

function debounce (callback, timeoutDelay) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

const filterButtons = {
  default: document.querySelector(`#${FILTERS.DEFAULT}`),
  random: document.querySelector(`#${FILTERS.RANDOM}`),
  discussed: document.querySelector(`#${FILTERS.DISCUSSED}`)
};

function shufflePosts(posts) {
  const shuffled = [...posts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, MAX_UNIQUE_PICTURES);
}

const getFilteredPosts = (posts, filter) => {
  switch (filter) {
    case FILTERS.DEFAULT:
      return [...posts].slice();
    case FILTERS.RANDOM:
      return shufflePosts([...posts]);
    case FILTERS.DISCUSSED:
      return [...posts].sort((a, b) => a.comments.count - b.comments.count);
  }
};

const renderFilteredPosts = (filter) => {
  const filteredPosts = getFilteredPosts(currentPosts, filter);
  const picturesContainer = document.querySelector('.pictures');
  picturesContainer.innerHTML = '';

};

const onFilterClick = (filter) => {
  currentFilter = filter;

};

const initializeFilters = (posts) => {
  currentPosts = posts;

  filtersContainer.classList.remove('img-filters--inactive');

  filterButtons.default.addEventListener('click', () => onFilterClick(FILTERS.DEFAULT));
  filterButtons.random.addEventListener('click', () => onFilterClick(FILTERS.RANDOM));
  filterButtons.discussed.addEventListener('click', () => onFilterClick(FILTERS.DISCUSSED));
};

export { initializeFilters };

