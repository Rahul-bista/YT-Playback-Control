chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // if setSpeed on request
  if (request.type === "setSpeed") {
    // grab the video element
    const video = document.querySelector("video");
    if (video) {
      // set the speed of the video to speed received from the req obj
      video.playbackRate = request.speed;
      currentSpeed = request.speed;
    }
  } else if (request.type === "getSpeed") {
    sendResponse({ speed: currentSpeed });
  }
});
