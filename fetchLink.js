// linkUtils.js

// Array of URLs to skip from testing
const excludeUrls = [
  'https://example.com'  // Add URLs you want to exclude, separated by commas
];

// Function to check if a URL returns a 404 status
const checkLinkStatus = async (url, element, controller) => {
  // Check if the URL is in the exclude list, and skip it if it is
  if (excludeUrls.includes(url)) {
    console.log(`Skipping ${url} as it's in the exclude list.`);
    return;
  }

  try {
    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    // Configure the request (POST to the server URL)
    xhr.open('POST', 'http://localhost:3000/check-url-status', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    // Set up the response handling
    xhr.onload = function () {
      if (xhr.status === 200) {
        // Parse the response as JSON
        const data = JSON.parse(xhr.responseText);

        // Check the status returned by the server
        const status = data.status;

        // Highlight based on the status code
        if (status === 404) {
          element.style.outline = '4px solid red';  // 404 Not Found
        } else if (status >= 200 && status < 300) {
          element.style.outline = '4px solid green';  // 2xx Success
        } else {
          element.style.outline = '4px solid orange';  // Non-404 but unsuccessful status
        }
      } else {
        console.error(`Error checking URL ${url}: ${xhr.statusText}`);
      }
    };

    // Handle any errors during the request
    xhr.onerror = function () {
      console.error(`Error fetching status for ${url}:`, xhr.statusText);
    };

    // Send the request with the URL in the body as JSON
    const requestBody = JSON.stringify({ url });
    xhr.send(requestBody);

  } catch (error) {
    console.error(`Error fetching status for ${url}:`, error);
  }
};
