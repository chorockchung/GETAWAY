
// Content script runs when the page loads
// document.addEventListener("DOMContentLoaded", function () {
//     // Perform actions when the page is ready
  
//         // Create an image element
//     // const image = document.createElement("img");

//     // // Set the source for the image
//     // image.src = chrome.runtime.getURL("/images/test.png");
//     // // image.src = "";
//     // // Set the styles for floating the image
//     // image.style.position = "fixed";
//     // image.style.bottom = "300px";
//     // image.style.right = "300px";
//     // image.style.zIndex = "9999";
//     // image.style.width = "auto";
//     // image.style.height = "auto";

//     // image.id = "customImageHamster";

//     // document.body.appendChild(image);

//     // Create a reminder element for the floating image
//     const reminder = document.createElement('button');
//     reminder.style.position = 'fixed';
//     reminder.style.bottom = '10px';  // Adjust the position as needed
//     reminder.style.right = '10px';   // Adjust the position as needed
//     reminder.style.zIndex = 9999;

//     // Create the overlay image using CSS background
//     reminder.style.width = '100px';
//     reminder.style.height = '80px';
//     reminder.style.fontSize = '50px';
//     reminder.textContent = "💡"
//     reminder.style.backgroundColor = "transparent";
//     reminder.style.border = "0px";

//     reminder.id ='reminder';
    
//     // Append the reminder to the document body
//     document.body.appendChild(reminder);

//     // Get a reference to an HTML element
//     const bubble = document.createElement('div'); // Replace with the actual element you want to style

//     bubble.style.backgroundColor = 'blue';
//     bubble.style.color = 'white';
//     bubble.style.padding = '10px';
//     bubble.style.borderRadius = '5px';
//     bubble.style.fontSize = '16px';
//     bubble.style.zIndex = 9999;
//     bubble.style.position = 'fixed';
//     bubble.style.bottom = '10px';  // Adjust the position as needed
//     bubble.style.right = '10px'; 
//     // bubble.style.visibility = 'hidden';
//     bubble.id='bubble'

//     document.body.appendChild(bubble);
// });

// // contentScript.js
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     if (request.message === "timefor") {
//         const bubble = document.getElementById('bubble')
//         bubble.style.visibility = 'hidden';
//         bubble.textContent = 'time for stretch!'
//         console.log('time message received')
//     }
//   });

// function showSpeechBubble() {
//   const bubble = document.createElement('div');
//   bubble.className = 'speech-bubble';
//   bubble.textContent = "It's time to take a break!";
//   document.body.appendChild(bubble);

//   setTimeout(() => {
//     bubble.remove();
//   }, 5000); // Remove the message after 5 seconds
// }
