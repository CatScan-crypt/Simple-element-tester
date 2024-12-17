// content.js
console.log("Script loaded");

// Define CSS styles for highlights
const highlightStyle = 'outline: 4px solid yellow;';
const highlightErrorStyle = 'outline: 4px solid red;';
const highlightGoodStyle = 'outline: 4px solid green;';
const highlightNotFetchedStyle = 'outline: 4px solid orange;';

// Create a <style> element and append it to <head> to apply the highlight
const styleElement = document.createElement('style');
styleElement.textContent = 
  'a.highlighted, button.highlighted { ' + highlightStyle + ' }';
document.head.appendChild(styleElement);

let testInterval; // Variable to store the test interval
let testRunning = false; // Flag to check if the test is running
let controller; 


// Stop the test
const stopTest = () => {
  console.log("Test stopped");

  // Set testRunning flag to false to stop the test
  testRunning = false;
  
  // Abort the ongoing fetch requests if any
  if (controller) {
    controller.abort();
  }
};

// Listen for start and stop test messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'startTest') {
    startTest(); // startTest.js
  } else if (request.action === 'stopTest') {
    stopTest();
  }
});
