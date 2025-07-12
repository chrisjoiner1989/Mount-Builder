// Uses bible-api.com (no API key required)

// API Configuration
const API_BASE_URL = "https://bible-api.com/";

// Dom Elements
const elements = {
  // Scripture Search Elements
  SearchForm: document.getQuerySelector(".search-form"),
  searchInput: document.getElementById("scripture-search"),
  searchButton: document.querySelector(".search-btn"),
  searchResults: document.getElementById(".search-results"),
};
