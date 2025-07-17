class mountBuilder {
  constructor() {
    this.currentSection = "sermon";
    this.sermonData = {
      title: "",
      data: "",
      scripture: "",
      notes,
    };
    this.init();
  }

  // Event Listeners
  init() {
    this.setupEventListeners();
    this.loadSermonData();
  }

  setupEventListeners() {
    // nav buttons
    document
      .getElementById("sermonBtn")
      .addEventListener("click", () => this.showSection("sermon"));
    document
      .getElementById("verseBtn")
      .addEventListener("click", () => this.showSection("verse"));
    document
      .getElementById("messageBtn")
      .addEventListener("click", () => this.showSection("message"));
    document
      .getElementById("exportBtn")
      .addEventListener("click", () => this.showSection("export"));
    // Sermon Form inputs
    document.getElementById("sermonTitle").addEventListener("input", (e) => {
      this.sermonData.title = e.target.value;
      this.saveSermonData();
    });
    document.getElementById("sermonDate").addEventListener("input", (e) => {
      this.sermonData.date = e.target.value;
      this.saveSermonData();
    });
    document
      .getElementById("sermonScripture")
      .addEventListener("input", (e) => {
        this.sermonData.scripture = e.target.value;
        this.saveSermonData();
      });
    document.getElementById("sermonNotes").addEventListener("input", (e) => {
      this.sermonData.notes = e.target.value;
      this.saveSermonData();
    });

    // Verse Search
    document
      .getElementById("searchBtn")
      .addEventListener("click", () => this.searchVerses());
    document.getElementById("verseSearch").addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.searchVerses();
    });
    // Export Btns
    document
      .getElementById("exportPptBtn")
      .addEventListener("click", () => this.exportToPowerPoint());
    document
      .getElementById("exportPdfBtn")
      .addEventListener("click", () => this.exportToPDF());
    document
      .getElementById("exportWordBtn")
      .addEventListener("click", () => this.exportToWord());
    // Send Messages
    document
      .getElementById("sendMessageBtn")
      .addEventListener("click", () => this.sendMessage());
  }
}
