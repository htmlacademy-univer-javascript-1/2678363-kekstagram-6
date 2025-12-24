

const FILTERS = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const filtersContainer = document.querySelector('.img-filters');
filtersContainer.classList.remove('img-filters--inactive');

let filteredPosts = [];
const showFilteredPosts = () => {
  switch (FILTERS) {
    case FILTERS.DEFAULT:
      filteredPosts.slice();
      break;
    case FILTERS.RANDOM:
      filteredPosts.Math.floor(Math.random() * );

    case FILTERS.DISCUSSED:
      filteredPosts.sort();

  }
}
