/*
  Demo-only login guard.

  This is NOT secure. It only helps with layout/prototype work.
  Replace with real authentication before launching an admin panel.
*/

const AdminAuth = (() => {
  const KEY = "nicks-lures-admin-demo-login";

  function isLoggedIn() {
    return localStorage.getItem(KEY) === "yes";
  }

  function login() {
    localStorage.setItem(KEY, "yes");
  }

  function logout() {
    localStorage.removeItem(KEY);
    window.location.href = "index.html";
  }

  function requireLogin() {
    if (!isLoggedIn()) {
      window.location.href = "index.html";
    }
  }

  return { isLoggedIn, login, logout, requireLogin };
})();

document.addEventListener("click", (event) => {
  if (event.target.matches("[data-logout]")) {
    AdminAuth.logout();
  }
});
