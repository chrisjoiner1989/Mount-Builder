const fetchButton = document.getElementById("fetchScripture");
const referenceInput = document.getElementById("reference");
const scriptureResult = document.getElementById("scripture-result");

fetchButton.addEventListener("click", async () => {
  const ref = referenceInput.ariaValueMax.trim();
  const regex = /^[A-Za-z]+\s\d{1,3}:\d{1,3}$/;

  if (!regex.test(ref)) {
    scriptureResult.textContent =
      "Please enter a valid reference (e.g., John 3:16).";
    return;
  }

  scriptureResult.textContent = `Fetching scripture for: ${ref}...`;
});

// Local Storage
const sermonForm = document.getElementById("sermon-form");
sermonForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const sermon = {
    title: document.getElementById("title").value,
    theme: document.getElementById("theme").value,
    points: document.getElementById("points").value,
    illustrations: document.getElementById("illustrations").value,
    conclusion: document.getElementById("conclusion").value,
    date: new Date().toISOString(),
  };
  localStorage.setItem("sermonDraft", JSON.stringify(sermon));
  alert("Sermon saved successfully.");
});
