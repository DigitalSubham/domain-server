document.addEventListener("DOMContentLoaded", function () {
  // Add event listener to the lookupButton
  document
    .getElementById("lookupButton")
    .addEventListener("click", function () {
      const domain = document.getElementById("domainInput").value;
      domainAge(domain);
    });

  // Other code
});

async function domainAge(domain) {
  const response = await fetch(`http://localhost:3000/whois?domain=${domain}`);
  const data = await response.json();
  // console.log(data);

  // Convert creation_date, updated_date, and expiration_date to Date objects
  const creationDate = new Date(data.creation_date);
  const updatedDate = new Date(data.updated_date);
  const expirationDate = new Date(data.expiration_date);

  // Calculate age
  const age = calculateAge(creationDate);

  // Update DOM elements
  document.getElementById("name").innerHTML = domain;
  document.getElementById("domainCreated").innerHTML =
    creationDate.toLocaleDateString();
  document.getElementById("age").innerHTML = age;
  document.getElementById("domainUpdated").innerHTML =
    updatedDate.toLocaleDateString();
  document.getElementById("domainExpiration").innerHTML =
    expirationDate.toLocaleDateString();
}

function calculateAge(creationDate) {
  const start = new Date(creationDate);
  const end = new Date();
  let difference = end - start;
  const daysDifference = Math.floor(difference / (1000 * 60 * 60 * 24));

  // Calculate years and remaining days
  const years = Math.floor(daysDifference / 365);
  const remainingDays = daysDifference % 365;

  return `${years} years ${remainingDays} days`;
}

// Function to get the current tab's URL
function getCurrentTabUrl(callback) {
  // Query the currently active tab
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // Retrieve the URL of the active tab
    var url = tabs[0].url;
    let rootDomain = extractRootDomainFromUrl(url);
    // Pass the URL to the callback function
    callback(rootDomain);
  });
}

function extractRootDomainFromUrl(url) {
  let domain = url.replace(/^https?:\/\//, ""); // Remove protocol
  domain = domain.split("/")[0]; // Remove path
  domain = domain.split(".").slice(-2).join("."); // Extract root domain
  return domain;
}

// Function to update the DOM with the current tab's URL
function updateCurrentTabUrl(url) {
  //   document.getElementById("currentTabUrl").textContent = url;
  domainAge(url);
}

// Call getCurrentTabUrl() to fetch the current tab's URL and update the DOM
getCurrentTabUrl(updateCurrentTabUrl);
