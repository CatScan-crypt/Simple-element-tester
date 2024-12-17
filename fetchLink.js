// linkUtils.js

// Array of URLs to skip from testing
const excludeUrls = [
    'https://example.com'  // Add URLs you want to exclude seperated by comma
  ];
  

  // Function to check if a URL returns a 404 status
 const checkLinkStatus = async (url, element, controller) => {
    // Check if the URL is in the exclude list, and skip it if it is
    if (excludeUrls.includes(url)) {
      console.log(`Skipping ${url} as it's in the exclude list.`);
      return;
    }
  
    try {
      // Use the controller to allow aborting the fetch
      const response = await fetch(url, { 
        method: 'HEAD', 
        mode: 'no-cors', 
        signal: controller.signal 
      });
      console.log(`Testing ${url}`)
      if (response.status === 404) {
        // Change the highlight color to red if the status is 404
        element.style.outline = '4px solid red';
      } else if (response.status >= 200 && response.status < 300) {
        // Change the highlight color to green if the status is 2xx (successful)
        element.style.outline = '4px solid green';
      } else {
        // Change the highlight color to yellow for non-404 but unsuccessful status
        element.style.outline = '4px solid orange';
      }
    } catch (error) {
      // Log the error but don't stop further tests
      if (error.name === 'AbortError') {
        console.log(`Fetch for ${url} was aborted.`);
      } else {
        console.error(`Error fetching ${url}:`, error);
      }
      element.style.outline = '4px solid yellow';
    }
  };
  