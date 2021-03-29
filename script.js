const videoElement = document.getElementById("video");
const button = document.getElementById("button");
const buttonSrc = document.getElementById("button-src");

//Prompt to select media stream, pass to video element, than play

async function selectMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };
  } catch (error) {
    // Catch error Here

    console.log("whoops, error here:", error);
  }
}

button.addEventListener("click", async () => {
  //Disable Button
  if (button.textContent === "START") {
    button.disabled = true;
    // Start Picture in picture
    await videoElement.requestPictureInPicture();
    // Reset Button
    button.disabled = false;
  } else document.exitPictureInPicture();
});

buttonSrc.addEventListener("click", () => selectMediaStream());

videoElement.addEventListener(
  "enterpictureinpicture",
  () => (button.textContent = "STOP")
);
videoElement.addEventListener(
  "leavepictureinpicture",
  () => (button.textContent = "START")
);

// On load

selectMediaStream();
