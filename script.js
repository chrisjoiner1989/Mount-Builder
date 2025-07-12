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

// Bible books for validation
const bibleBooks = [
  "Genesis",
  "Exodus",
  "Leviticus",
  "Numbers",
  "Deuteronomy",
  "Joshua",
  "Judges",
  "Ruth",
  "1 Samuel",
  "2 Samuel",
  "1 Kings",
  "2 Kings",
  "1 Chronicles",
  "2 Chronicles",
  "Ezra",
  "Nehemiah",
  "Esther",
  "Job",
  "Psalms",
  "Proverbs",
  "Ecclesiastes",
  "Song of Solomon",
  "Isaiah",
  "Jeremiah",
  "Lamentations",
  "Ezekiel",
  "Daniel",
  "Hosea",
  "Joel",
  "Amos",
  "Obadiah",
  "Jonah",
  "Micah",
  "Nahum",
  "Habakkuk",
  "Zephaniah",
  "Haggai",
  "Zechariah",
  "Malachi",
  "Matthew",
  "Mark",
  "Luke",
  "John",
  "Acts",
  "Romans",
  "1 Corinthians",
  "2 Corinthians",
  "Galatians",
  "Ephesians",
  "Philippians",
  "Colossians",
  "1 Thessalonians",
  "2 Thessalonians",
  "1 Timothy",
  "2 Timothy",
  "Titus",
  "Philemon",
  "Hebrews",
  "James",
  "1 Peter",
  "2 Peter",
  "1 John",
  "2 John",
  "3 John",
  "Jude",
  "Revelation",
];

// Initializing the application
function init() {
  setupEventListeners();
  loadSavedSermons();
  initializedCalender();
  setupTimeCalculations();
}
