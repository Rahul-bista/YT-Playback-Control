// wait for the video to load properly
window.addEventListener("load", () => {
  // access slider and custom inputfield
  var slider = document.getElementById("playback_speed_range");
  var custom_playback = document.getElementById("playback_speed_input");

  // get the current playback speed from the content script
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    // send a message to all the tabs with tab id, and a request of getSpeed
    chrome.tabs.sendMessage(tab.id, { type: "getSpeed" }, (response) => {
      if(response.speed){
        slider.value = response.speed
        custom_playback.value = response.speed
      }
    });
  });

  // access all the buttons
  var btn1x = document.getElementById("1x");
  var btn1_5x = document.getElementById("1.5x");
  var btn2x = document.getElementById("2x");
  var btn2_5x = document.getElementById("2.5x");
  var btn3x = document.getElementById("3x");
  var btn3_5x = document.getElementById("3.5x");
  var btn4x = document.getElementById("4x");

  // handle buttons
  btn1x.addEventListener("click", () => {
    changePlayback(1);
    slider.value = 1;
    custom_playback.value = 1;
  });

  btn1_5x.addEventListener("click", () => {
    changePlayback(1.5);
    slider.value = 1.5;
    custom_playback.value = 1.5;
  });

  btn2x.addEventListener("click", () => {
    changePlayback(2);
    slider.value = 2;
    custom_playback.value = 2;
  });

  btn2_5x.addEventListener("click", () => {
    changePlayback(2.5);
    slider.value = 2.5;
    custom_playback.value = 2.5;
  });

  btn3x.addEventListener("click", () => {
    changePlayback(3);
    slider.value = 3;
    custom_playback.value = 3;
  });

  btn3_5x.addEventListener("click", () => {
    changePlayback(3.5);
    slider.value = 3.5;
    custom_playback.value = 3.5;
  });

  btn4x.addEventListener("click", () => {
    changePlayback(4);
    slider.value = 4;
    custom_playback.value = 4;
  });

  // handle custom playback speed (inputfield)
  custom_playback.addEventListener("change", () => {
    var value = parseFloat(custom_playback.value);

    // validate input
    if (value && value >= 0.1 && value <= 10) {
      slider.value = custom_playback.value;
      changePlayback(value);
    } else if (value && value > 10) {
      alert("playback speed > 10 isn't allowed!");
      slider.value = 10;
      custom_playback.value = 10;
    } else {
      alert("playback speed > 0 isn't allowed!");
      slider.value = 1;
      custom_playback.value = 1;
    }
  });

  // handle custom playback slider
  slider.addEventListener("change", () => {
    console.log("working");
    var value = parseFloat(slider.value);
    if (value && value >= 0.1 && value <= 10) {
      custom_playback.value = slider.value;
      changePlayback(value);
    }
  });

  // send setspeed request through chrome api
  function changePlayback(speed) {
    // get the list of all the active chrome tabs
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      // send a message to all the tabs with curr tab id, and speed
      chrome.tabs.sendMessage(tab.id, { type: "setSpeed", speed });
    });
  }
});
