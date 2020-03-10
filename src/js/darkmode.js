const ICONS = ['at', 'linkedin', 'github', 'facebook', 'twitter'];

const TOGGLE_SWITCH = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);

// Check first the local storage to see if the user has already stored a preference
// Then check the user's OS to see if it has a preference
// Otherwise default to light
const INITIAL_THEME =
  localStorage.getItem('theme') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light') ||
  'light';

setTheme(INITIAL_THEME);
TOGGLE_SWITCH.checked = INITIAL_THEME === 'dark';

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  for (var icon of ICONS) {
    document.getElementById(icon).setAttribute('src', `assets/social/${theme}/icon-${icon}.svg`);
  }
}

function switchTheme(event) {
  setTheme(event.target.checked ? 'dark' : 'light');
}

TOGGLE_SWITCH.addEventListener('change', switchTheme, false);
