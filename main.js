// Dom Elements
const sermonForm = document.getElementById("sermon-form");
const fetchVerseBtn = document.getElementById("fetch-verse");
const verseOutput = document.getElementById("verse-output");
const sermonList = document.getElementById("sermon-list");

// input fields
const titleInput = document.getElementById("title");
const scriptureInput = document.getElementById("scripture");
const dateInput = document.getElementById("date");
const notesInput = document.getElementById("notes");

// event: fetch bible verse
fetchVerseBtn.addEventListener("click", () => {
  const scripture = scriptureInput.ariaValueMax.trim();

  if (!scripture) {
    alert("Please enter a scripture reference (e.g. John 3:16)");
    return;
  }

  console.log("fetching verse for:", scripture);
});

// event: save sermon form.

sermonForm.addEventListener("Submit", (e) => {
  e.preventDefault();

  const sermonData = {
    title: titleInput.value.trim(),
    scripture: scriptureInput.value.trim(),
    date: dateInput.value.trim(),
    notes: notesInput.value.trim(),
  };
  console.log("Saving sermon", sermonData);
});

// bible api fetch
function fetchVerse(reference) {
  const apiUrl = `https://bible-api.com/${encodeURIComponent(reference)}`;

  verseOutput.textContent = "Loading verse...";
  fetch(apiUrl)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Verse not found.");
      }
      return res.json();
    })
    .then((data) => {
      if (data.verse) {
        verseOutput.textContent = data.verse.text;
      } else if (data.text) {
        verseOutput.textContent = `"${data.text}"\n— ${data.reference}`;
      } else {
        verseOutput.textContent = "Verse not found.";
      }
    })
    .catch((err) => {
      console.log(err);
      verseOutput.textContent =
        "Error fetching verse. Please check the reference format.";
    });
}

// updated event: fetch bible verse
fetchVerseBtn.addEventListener("click", () => {
  const scripture = scriptureInput.value.trim();

  if (!scripture) {
    alert("Please enter a scripture reference (e.g. John 3:16)");
  }

  fetchVerse(scripture);
});
