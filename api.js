// ===== CONFIG =====
const APPS_SCRIPT_URL = "PASTE_YOUR_WEB_APP_URL_HERE";

// ===== PAGE 1: UPLOAD TEMPLATE =====
function handleTemplateNext() {
  const fileInput = document.querySelector('input[type="file"]');
  const templateFile = fileInput.files[0];

  if (!templateFile) {
    alert("Please upload a certificate template");
    return;
  }

  // Store file temporarily in memory (not upload yet)
  sessionStorage.setItem("templateFileName", templateFile.name);

  // Store file in a global variable (needed for same session)
  window.selectedTemplateFile = templateFile;

  // Move to next page
  window.location.href = "select-sheet.html";
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

  if (!window.selectedTemplateFile) {
    alert("Template file missing. Go back and upload again.");
    return;
  }
function extractSheetId(link) {
  const match = link.match(/\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : null;
}

  generateCertificates(sheetId);
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
