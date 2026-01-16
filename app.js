// Called automatically after Google sign-in
function handleGoogleLogin(response) {
  const idToken = response.credential;
  console.log("Google ID Token:", idToken);

  // Optional: store token for later use
  localStorage.setItem("google_id_token", idToken);

  // Redirect after login
  window.location.href = "upload-template.html";
}
