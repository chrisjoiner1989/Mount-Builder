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

function validateSermon(sermon) {
  const titleRegex = /^[a-zA-Z0-9\s]+$/;
  const scriptureRegex = /^[1-3]?\s?[A-Za-z]+\s\d+:\d+$/;

  if (!titleRegex.test(sermon.title)) {
    alert("Sermon title must only contain letters, numbers, and spaces.");
    return false;
  }

  if (!scriptureRegex.test(sermon.scripture)) {
    alert(
      'Scripture reference must be in format like "John 3:16" or "1 Corinthians 13:4".'
    );
    return false;
  }
  return true;
}

sermonForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const sermonData = {
    title: titleInput.value.trim(),
    scripture: scriptureInput.value.trim(),
    date: dateInput.value,
    notes: notesInput.value.trim(),
  };

  if (!validateSermon(sermonData)) {
    return;
  }

  saveSermon(sermonData);
  clearForm();
  alert("Sermon saved successfully!");
});

//Local storage
function saveSermon(sermon) {
  const sermons = JSON.parse(localStorage.getItem("sermons")) || [];
  sermons.push(sermon);
  localStorage.setItem("sermons", JSON.stringify(sermons));
}

// clear forms field
function clearForm() {
  sermonForm.requestFullscreen();
}

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
