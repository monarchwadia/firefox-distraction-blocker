// Hardcoded list of distracting websites to block
const BLOCKED_SITES = [
  "*://*.facebook.com/*",
  "*://*.twitter.com/*",
  "*://*.x.com/*",
  "*://*.instagram.com/*",
  "*://*.tiktok.com/*",
  "*://*.reddit.com/*",
  "*://*.youtube.com/*",
  "*://*.twitch.tv/*",
  "*://*.netflix.com/*",
  "*://*.snapchat.com/*",
  "*://*.pinterest.com/*",
  "*://*.tumblr.com/*",
  "*://*.discord.com/*",
  "*://*.linkedin.com/*",
];

// Track whether blocking is enabled
let isEnabled = true;

// Initialize state from storage
browser.storage.local.get("isEnabled").then((result) => {
  if (result.isEnabled !== undefined) {
    isEnabled = result.isEnabled;
  } else {
    // Default to enabled
    browser.storage.local.set({ isEnabled: true });
  }
  console.log("Distraction Blocker initialized. Enabled:", isEnabled);
});

// Listen for toggle messages from popup
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "toggle") {
    isEnabled = !isEnabled;
    browser.storage.local.set({ isEnabled: isEnabled });
    console.log("Distraction Blocker toggled. Enabled:", isEnabled);
    sendResponse({ isEnabled: isEnabled });
  } else if (message.action === "getStatus") {
    sendResponse({ isEnabled: isEnabled });
  }
  return true;
});

// Block requests to distracting websites
browser.webRequest.onBeforeRequest.addListener(
  function(details) {
    if (isEnabled) {
      return { cancel: true };
    }
    return { cancel: false };
  },
  { urls: BLOCKED_SITES },
  ["blocking"]
);

console.log("Distraction Blocker loaded. Blocking:", BLOCKED_SITES);
