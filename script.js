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
  // Sermon Form Elements
  sermonTitle: document.getElementById("sermon-title"),
  sermonContent: document.getElementById("sermon-content"),
  // Breakdown Elements
  scriptureReferences: document.getElementById("scripture-references"),
  // Library Elements
  saveSermonBtn: document.querySelector(".save-sermon-btn"),
  sermonList: document.getElementById("sermon-list"),
  // Timer Elements
  timerDisplay: document.getElementById("timer-display"),
  startTimerBtn: document.querySelector(".start-timer-btn"),
  pauseTimerBtn: document.querySelector(".pause-timer-btn"),
  resetTimerBtn: document.querySelector(".reset-timer-btn"),
};
