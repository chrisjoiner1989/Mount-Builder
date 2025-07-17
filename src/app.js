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

  // Event Listners
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
  }
}
