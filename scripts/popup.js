// Define the time threshold in milliseconds (30 minutes)
const activityThreshold = 30 * 60 * 1000;

// Keep track of the last activity time
let lastActivityTime = Date.now();
let elapsedTime = 0;
let intervalId; 
let finishFlag;

const finishButton = document.querySelector('.finishButton');
const timeMessage = document.querySelector('#timeMessage');
const timeElement = document.querySelector('.passedTime');
const toggleButton = document.querySelector('.toggleButton');
const test = document.querySelector('.test');
const randomMsg = document.querySelector('.randomMessage');
const min30 = document.querySelector('#30min');
const min45 = document.querySelector('#45min');
const min60 = document.querySelector('#60min');
// // Function to show the popup and reset the activity timer
// function showPopup() {
//     const popup = document.querySelector('.popup-container');
//     popup.style.display = 'block';
//     lastActivityTime = Date.now();
// }

// // Function to hide the popup
// function hidePopup() {
//     const popup = document.querySelector('.popup-container');
//     popup.style.display = 'none';
// }

// // Check for user activity and show the popup if the threshold is reached
// function checkActivity() {
//     const currentTime = Date.now();
//     if (currentTime - lastActivityTime >= activityThreshold) {
//         showPopup();
//     } else {
//         hidePopup();
//     }
// }

// Add an event listener to the sing button
// const singButton = document.querySelector('.sing-button');

let msg = ['일어나서 스트레칭을 해요!', '오늘 벌써 이만큼이나 공부했어🔥', 
'잠깐 산책하러 다녀올까?', '잠깐 창 밖을 보자!'];

singButton.addEventListener('click', () => {
    // You can add your singing functionality here
    alert("🎵 Singing a cheering song! 🎵");
});

// // Function to change the text content in the div
// function changeTextOverTime() {
//     const timeElement = document.querySelector('.passedTime');
//     timeElement.textContent = (Date.now() - lastActivityTime)/1000;
// }

// function updateElapsedTime() {
//     timeElement.textContent = `${elapsedTime}`;
//     elapsedTime++; // Increment elapsed time

//     chrome.storage.local.set({ 'elapsedTime': elapsedTime });
// }

// Function to initialize the elapsed time
function whenPopUpisOpened() {
    chrome.storage.local.get(['finishFlag', 'elapsedTime', 'randomMin'], function(result) {
        timeElement.textContent = result.elapsedTime

        if(result.finishFlag == false) {
            timeMessage.textContent = '분이 흘렀어요!';
            timeElement.style.display = 'block';
            finishButton.style.display = 'block';
        }
 
        if(result.finishFlag == true) {
            toggleButton.textContent = 'START';
        }
        else {
            toggleButton.textContent = 'RESUME';
        }
        console.log(result.elapsedTime + 'and' +result.finishFlag)
       
        const min = 1;
        const max = 4;
        const randomWholeNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        
        if(result.elapsedTime == randomMin && result.finishFlag == false) {
            console.log('randomMin' + randomMin);
            randomMsg.textContent = msg[randomWholeNumber];
        }
    });
  }
  
  // Initialize the elapsed time when the pop-up is opened
whenPopUpisOpened();

function randomMessage() {
    const randomMessageElement = document.querySelector('.randomMessage');

}

toggleButton.addEventListener('click', () => {
    if(toggleButton.textContent === 'START' || toggleButton.textContent === 'RESUME') { 
        chrome.runtime.sendMessage({ action: 'started' }, function(response) {
            timeElement.textContent = 0;
        })

        toggleButton.textContent = 'PAUSE';
        timeMessage.textContent = '시작할게요!';
        timeElement.style.display = 'block';
        finishButton.style.display = 'block';
    }
    else {
        // Pause the timer
        chrome.runtime.sendMessage({ action: 'paused' })
        clearInterval(intervalId);
        
        toggleButton.textContent = 'RESUME'
    };
 });

//  chrome.runtime.sendMessage 등의 크롬 확장 API는 비동기식입니다. 
// 이는 chrome.runtime.sendMessage를 사용하여 메시지를 보낼 때 
// 다음 줄의 코드보다 먼저 메시지가 처리된다는 것을 보장하지 않습니다.
// 이 문제를 해결하려면 팝업에서 UI를 변경하기 전에 '완료' 메시지가 처리되고 저장소가 업데이트될 때까지 기다려야 합니다.
 finishButton.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'finish' }, function(response) {
        // Update the UI after the finish message has been processed
        if(response !== undefined) {
            timeMessage.textContent = '오늘 할 일을 모두 끝냈어!';
            toggleButton.textContent = 'START';
            finishButton.style.display = 'none';
            timeElement.style.display = 'none';
        }
    });
});

min30.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: '30min'})
})
min45.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: '45min'})
})
min60.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: '60min'})
})
