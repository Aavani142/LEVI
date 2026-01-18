// ===== CONFIG =====
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwz5SD4xUTyUtPSf6stFdVCh3w2fTYHmstNSC2o3pjdKVzf34PhRWbYSwnu09dMdcdiOA/exec"
function handleTemplateNext() {
  const linkInput = document.getElementById("slideLink");
  const slideLink = linkInput.value.trim();

  if (!slideLink) {
    alert("Please paste the Google Slides template link");
    return;
  }

  // Basic validation (must be a Google Slides link)
  if (!slideLink.includes("docs.google.com/presentation")) {
    alert("Please enter a valid Google Slides link");
    return;
  }

  // Store link for later steps
  sessionStorage.setItem("templateSlideLink", slideLink);

  console.log("Template link saved:", slideLink);

  // Go to next page
  window.location.href = "select-sheet.html";
}


function extractSheetId(url) {
  const match = url.match(/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

function extractSlideId(url) {
  const match = url.match(/presentation\/d\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

function goToGenerate() {
  const sheetLink = document.getElementById("sheetLink").value.trim();

  if (!sheetLink) {
    alert("Please paste Google Sheet link");
    return;
  }

  const sheetId = extractSheetId(sheetLink);
  if (!sheetId) {
    alert("Invalid Google Sheet link");
    return;
  }

  const slideLink = sessionStorage.getItem("templateSlideLink");
  if (!slideLink) {
    alert("Template link missing. Go back and paste the Slides link again.");
    return;
  }

  const slideId = extractSlideId(slideLink);

  generateCertificates(sheetId, slideId);
}
function generateCertificates(sheetId, slideId) {
  const url = `${APPS_SCRIPT_URL}?sheetId=${sheetId}&slideId=${slideId}`;

  fetch(url, { mode: "no-cors" })
    .then(() => {
      alert("Certificate generation started successfully!");
    })
    .catch(() => {
      alert("Request sent, but browser blocked the response.");
    });
}


// Called automatically after Google sign-in
function handleGoogleLogin(response) {
  const idToken = response.credential;
  console.log("Google ID Token:", idToken);

  // Optional: store token for later use
  localStorage.setItem("google_id_token", idToken);

  // Redirect after login
  window.location.href = "upload-template.html";
}
