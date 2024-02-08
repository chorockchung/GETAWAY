let elapsedTime = 0;
let finishFlag = true;
let timerState = false;
let intervalId; 

  // Listen for messages from the pop-up script
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

    // if (request.action === 'started') {
    //   console.log('get start request')

    //   chrome.storage.local.get('elapsedTime', function(result) {
    //     elapsedTime = result.elapsedTime || 0; // Use 0 if not found in storage

    //     ++elapsedTime; 
    //     chrome.storage.local.set({ 'elapsedTime': elapsedTime });
    //     chrome.storage.local.set({ 'finishFlag': false });
    //   });
    //   sendResponse({ elapsedTime: elapsedTime });      
    // }
    
    if(request.action === 'started') {
      chrome.storage.local.set({ 'finishFlag': false });
      console.log("started");
      intervalId = setInterval(function () {
        // Your time-related code here
        chrome.storage.local.get('elapsedTime', function(result) {
          elapsedTime = result.elapsedTime || 0; // Get elapsed time from storage
          ++elapsedTime;

          console.log("Timer is running...");
          chrome.storage.local.set({ 'elapsedTime': elapsedTime });

          chrome.storage.local.get( 'randomMin' );
          if(elapsedTime % 10 == 0) {
            chrome.storage.local.set({ 'timefor': true });
            console.log('sendit')
          }
          console.log(elapsedTime);
        });
        sendResponse({ elapsedTime: elapsedTime });
      }, 1000); //1minute
    }

    if (request.action === 'finish') {
      chrome.storage.local.set({ 'elapsedTime': 0 });
      chrome.storage.local.set({ 'finishFlag': true });
              // Send the response after the storage has been updated
      sendResponse( 'success' );
    }  
    if(request.action == 'paused') {
      clearInterval(intervalId);
      chrome.storage.local.set({ 'elapsedTime': elapsedTime });
    }
    if(request.action == '30min') {
      chrome.storage.local.set({ 'randomMin': 30 });
    }
    if(request.action == '45min') {
      chrome.storage.local.set({ 'randomMin': 45 });
    }
    if(request.action == '60min') {
      chrome.storage.local.set({ 'randomMin': 60 });
    }
  });

// Listen for messages from the background script
// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//   if (message.command === "changePageBackgroundColor") {
//     document.body.style.backgroundColor = message.color;
//   }
// });
chrome.runtime.sendMessage({ message: "Hello from background!" });