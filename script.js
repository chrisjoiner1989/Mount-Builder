// bible api config
const BIBLE_API_BASE_URL = "https://bible-api.com";

// DOM Elements
const scriptureSearchInput = document.getElementById("scripture-search");
const searchBtn = document.querySelector(".search-btn");
const searchResults = document.getElementById("search-results");

// Event Listeners
document.addEventListener("DOMContentLoaded", function () {
  // Scripture search functionality
  if (searchBtn) {
    searchBtn.addEventListener("click", handleScriptureSearch);
  }

  if (scriptureSearchInput) {
    scriptureSearchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        handleScriptureSearch();
      }
    });
  }
});
