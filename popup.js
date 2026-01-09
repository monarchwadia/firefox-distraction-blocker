const statusEl = document.getElementById('status');
const toggleBtn = document.getElementById('toggleBtn');

function updateUI(isEnabled) {
  if (isEnabled) {
    statusEl.textContent = 'Distractions blocked.';
    statusEl.className = 'message enabled';
    toggleBtn.textContent = 'Turn Off';
    toggleBtn.className = 'toggle-btn';
  } else {
    statusEl.textContent = 'Blocking disabled.';
    statusEl.className = 'message disabled';
    toggleBtn.textContent = 'Turn On';
    toggleBtn.className = 'toggle-btn disabled';
  }
}

// Get initial status
browser.runtime.sendMessage({ action: 'getStatus' }).then((response) => {
  updateUI(response.isEnabled);
});

// Handle toggle button click
toggleBtn.addEventListener('click', () => {
  browser.runtime.sendMessage({ action: 'toggle' }).then((response) => {
    updateUI(response.isEnabled);
  });
});
