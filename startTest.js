// Start the test
const startTest = () => {
    console.log("Test started");
  
    if (testRunning) return; // Prevent starting a new test if one is already running
  
    testRunning = true; // Set test as running
  
    // Create an AbortController to allow canceling the fetches
    controller = new AbortController(); // Create controller here
  
    // Select all anchor tags and buttons on the page
    const links = document.querySelectorAll('a');
    const buttons = document.querySelectorAll('button');
  
      // Function to introduce a delay between fetch requests
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));


    // Add highlight class to each anchor tag and button after 3 seconds
    setTimeout(() => {
      links.forEach(async (link, index) => {
        if (!testRunning) return; // Check if test is still running
        link.classList.add('highlighted');
        try {
          // If the URL is not in the exclude list, introduce a delay before testing
          if (!excludeUrls.includes(link.href)) {
            await delay(index * 1500);  // Delay the fetch by 1.5 seconds per link
          }
  
          // Check if the href returns a 404 and change the highlight color if so
          await checkLinkStatus(link.href, link, controller);
        } catch (error) {
          // Catch any errors and ensure the test continues
          console.error(`Skipping link due to error: ${error}`);
        }
      });
  
      buttons.forEach(button => {
        if (testRunning) {
          button.classList.add('highlighted');
        }
      });
    }, 300); // delay before starting the highlight
  };