// Mount Builder App - Main JavaScript File

class MountBuilder {
  constructor() {
    this.currentSection = "sermon";
    this.sermonData = {
      title: "",
      date: "",
      scripture: "",
      notes: "",
    };
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.loadSermonData();
  }

  setupEventListeners() {
    // Navigation buttons
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

    // Sermon form inputs
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

    // Verse search
    document
      .getElementById("searchBtn")
      .addEventListener("click", () => this.searchVerses());
    document.getElementById("verseSearch").addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.searchVerses();
    });

    // Export buttons
    document
      .getElementById("exportPptBtn")
      .addEventListener("click", () => this.exportToPowerPoint());
    document
      .getElementById("exportPdfBtn")
      .addEventListener("click", () => this.exportToPDF());
    document
      .getElementById("exportWordBtn")
      .addEventListener("click", () => this.exportToWord());

    // Send message
    document
      .getElementById("sendMessageBtn")
      .addEventListener("click", () => this.sendMessage());
  }

  showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll(".content-section").forEach((section) => {
      section.classList.remove("active");
    });

    // Remove active class from all nav buttons
    document.querySelectorAll(".nav-btn").forEach((btn) => {
      btn.classList.remove("active");
    });

    // Show selected section
    document.getElementById(sectionName + "Section").classList.add("active");
    document.getElementById(sectionName + "Btn").classList.add("active");

    this.currentSection = sectionName;
  }

  saveSermonData() {
    localStorage.setItem("mountBuilderSermon", JSON.stringify(this.sermonData));
  }

  loadSermonData() {
    const saved = localStorage.getItem("mountBuilderSermon");
    if (saved) {
      this.sermonData = JSON.parse(saved);

      // Populate form fields
      document.getElementById("sermonTitle").value =
        this.sermonData.title || "";
      document.getElementById("sermonDate").value = this.sermonData.date || "";
      document.getElementById("sermonScripture").value =
        this.sermonData.scripture || "";
      document.getElementById("sermonNotes").value =
        this.sermonData.notes || "";
    }
  }

  searchVerses() {
    const query = document.getElementById("verseSearch").value.trim();
    if (!query) {
      alert("Please enter a verse reference or topic to search");
      return;
    }

    // For now, we'll simulate verse search
    this.displayVerseResults(query);
  }

  displayVerseResults(query) {
    const resultsDiv = document.getElementById("verseResults");

    // Simulated verse data (in real app, this would come from Bible API)
    const sampleVerses = {
      "John 3:16": {
        text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
        related: [
          "Romans 5:8 - But God demonstrates his own love for us in this: While we were still sinners, Christ died for us.",
          "1 John 4:9 - This is how God showed his love among us: He sent his one and only Son into the world that we might live through him.",
        ],
      },
      "Philippians 4:13": {
        text: "I can do all this through him who gives me strength.",
        related: [
          '2 Corinthians 12:9 - But he said to me, "My grace is sufficient for you, for my power is made perfect in weakness."',
          "Isaiah 41:10 - So do not fear, for I am with you; do not be dismayed, for I am your God.",
        ],
      },
    };

    // Simple search logic
    let result = sampleVerses[query];
    if (!result) {
      // Try to find by topic
      if (query.toLowerCase().includes("love")) {
        result = sampleVerses["John 3:16"];
      } else if (query.toLowerCase().includes("strength")) {
        result = sampleVerses["Philippians 4:13"];
      }
    }

    if (result) {
      resultsDiv.innerHTML = `
                <div class="verse-result">
                    <h3>Primary Verse</h3>
                    <p><strong>${query}:</strong> ${result.text}</p>
                    
                    <h4>Related Verses</h4>
                    <ul>
                        ${result.related
                          .map((verse) => `<li>${verse}</li>`)
                          .join("")}
                    </ul>
                    
                    <button onclick="app.addVerseToSermon('${query}', '${
        result.text
      }')" class="btn-primary">Add to Sermon</button>
                </div>
            `;
    } else {
      resultsDiv.innerHTML = `
                <div class="verse-result">
                    <p>No results found for "${query}". Try searching for "John 3:16", "Philippians 4:13", or topics like "love" or "strength".</p>
                </div>
            `;
    }
  }

  addVerseToSermon(reference, text) {
    const currentNotes = document.getElementById("sermonNotes").value;
    const verseText = `\n\n${reference}: ${text}\n`;

    document.getElementById("sermonNotes").value = currentNotes + verseText;
    this.sermonData.notes = currentNotes + verseText;
    this.saveSermonData();

    // Switch to sermon section
    this.showSection("sermon");

    alert("Verse added to sermon notes!");
  }

  exportToPowerPoint() {
    if (!this.sermonData.title) {
      alert("Please add a sermon title before exporting");
      return;
    }

    // Create new PowerPoint presentation
    const pptx = new PptxGenJS();

    // Title slide
    const titleSlide = pptx.addSlide();
    titleSlide.addText(this.sermonData.title, {
      x: 1,
      y: 1.5,
      w: 8,
      h: 1.5,
      fontSize: 32,
      bold: true,
      align: "center",
      color: "363636",
    });

    if (this.sermonData.scripture) {
      titleSlide.addText(this.sermonData.scripture, {
        x: 1,
        y: 3,
        w: 8,
        h: 1,
        fontSize: 20,
        align: "center",
        color: "666666",
      });
    }

    if (this.sermonData.date) {
      titleSlide.addText(this.sermonData.date, {
        x: 1,
        y: 4,
        w: 8,
        h: 0.5,
        fontSize: 16,
        align: "center",
        color: "888888",
      });
    }

    // Parse sermon notes into slides
    if (this.sermonData.notes) {
      const slides = this.parseNotesIntoSlides(this.sermonData.notes);
      slides.forEach((slideContent) => {
        const slide = pptx.addSlide();
        slide.addText(slideContent.title, {
          x: 0.5,
          y: 0.5,
          w: 9,
          h: 1,
          fontSize: 24,
          bold: true,
          color: "363636",
        });

        slide.addText(slideContent.content, {
          x: 0.5,
          y: 1.5,
          w: 9,
          h: 5,
          fontSize: 18,
          color: "444444",
        });
      });
    }

    // Save the presentation
    pptx.writeFile({
      fileName: `${this.sermonData.title || "Sermon"}-Slides.pptx`,
    });
  }

  parseNotesIntoSlides(notes) {
    const slides = [];
    const lines = notes.split("\n");
    let currentSlide = { title: "Main Points", content: "" };

    lines.forEach((line) => {
      line = line.trim();
      if (line) {
        // Check if line looks like a heading (starts with number, bullet, or all caps)
        if (
          line.match(/^\d+\./) ||
          line.match(/^[•\-\*]/) ||
          line === line.toUpperCase()
        ) {
          if (currentSlide.content) {
            slides.push(currentSlide);
            currentSlide = { title: line, content: "" };
          } else {
            currentSlide.title = line;
          }
        } else {
          currentSlide.content += line + "\n";
        }
      }
    });

    if (currentSlide.content) {
      slides.push(currentSlide);
    }

    return slides;
  }

  exportToPDF() {
    alert("PDF export coming soon! For now, use the PowerPoint export.");
  }

  exportToWord() {
    alert("Word export coming soon! For now, use the PowerPoint export.");
  }

  sendMessage() {
    const message = document.getElementById("messageText").value.trim();
    if (!message) {
      alert("Please enter a message to send");
      return;
    }

    const sms = document.getElementById("smsOption").checked;
    const email = document.getElementById("emailOption").checked;
    const app = document.getElementById("appOption").checked;

    if (!sms && !email && !app) {
      alert("Please select at least one delivery method");
      return;
    }

    // Simulate sending message
    let methods = [];
    if (sms) methods.push("SMS");
    if (email) methods.push("Email");
    if (app) methods.push("App Notification");

    alert(
      `Message would be sent via: ${methods.join(
        ", "
      )}\n\nMessage: "${message}"\n\n(This is a simulation - actual sending functionality would require backend integration)`
    );

    // Clear the form
    document.getElementById("messageText").value = "";
    document.getElementById("smsOption").checked = false;
    document.getElementById("emailOption").checked = false;
    document.getElementById("appOption").checked = false;
  }
}

// Initialize app when page loads
let app;
document.addEventListener("DOMContentLoaded", () => {
  app = new MountBuilder();
});
