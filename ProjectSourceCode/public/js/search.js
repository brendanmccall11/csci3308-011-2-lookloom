const searchForm = document.querySelector('#searchForm');
searchForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const searchTerm = document.querySelector('#searchInput').value;
  window.location.href = `/gallery/search?q=${encodeURIComponent(searchTerm)}`;
});