var icons = ['at', 'linkedin', 'github', 'facebook', 'twitter'];

var toggleSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);

// Check first the local storage to see if the user has already stored a preference
// Then check the user's OS to see if it has a preference
// Otherwise default to light
var currentTheme =
  localStorage.getItem('theme') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light') ||
  'light';

setTheme(currentTheme);
toggleSwitch.checked = currentTheme === 'dark';

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  for (var icon of icons) {
    var iconElem = document.getElementById(icon);
    iconElem.setAttribute('src', `assets/social/${theme}/icon-${icon}.svg`);
  }
}

function switchTheme(event) {
  var theme = event.target.checked ? 'dark' : 'light';
  setTheme(theme);
}

toggleSwitch.addEventListener('change', switchTheme, false);
