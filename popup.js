// popup.js
document.getElementById('startTest').addEventListener('click', () => {
    // Send a message to the content script to start the test
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'startTest' });
    });
  });
  
  document.getElementById('stopTest').addEventListener('click', () => {
    // Send a message to the content script to stop the test
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'stopTest' });
    });
  });
  



