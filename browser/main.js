import { runTest } from "../run-test.js";
import { runTrial } from "../run-trial.js";

class Trials {
  constructor(video, images) {
    this.video = video;
    this.images = images;
  }

  runNext() {
    runTrial(this.video, this.images);
  }
}

function hideElement(element) {
  element.style.visibility = "hidden";
}

function showElement(element) {
  element.style.visibility = "visible";
}

class Button {
  constructor(buttonElement) {
    this.buttonElement = buttonElement;
  }

  setOnClick(f) {
    this.buttonElement.onclick = () => {
      f();
    };
  }

  show() {
    showElement(this.buttonElement);
  }

  hide() {
    hideElement(this.buttonElement);
  }
}

class Video {
  constructor(videoElement) {
    this.videoElement = videoElement;
  }

  setOnFinish(f) {
    this.videoElement.onended = () => {
      f();
    };
  }

  play() {
    this.videoElement.play();
  }

  show() {
    showElement(this.videoElement);
  }

  hide() {
    hideElement(this.videoElement);
  }
}

class Images {
  constructor(imageElements) {
    this.imageElements = imageElements;
  }

  setOnTouch(f) {
    this.imageElements.forEach((element) => {
      element.onclick = () => {
        f();
      };
    });
  }

  show() {
    this.imageElements.forEach((element) => showElement(element));
  }

  hide() {
    this.imageElements.forEach((element) => hideElement(element));
  }
}

function centerElementAtPercentage(element, x, y) {
  element.style.left = `${x}%`;
  element.style.top = `${y}%`;
  element.style.transform = "translate(-50%, -50%)";
}

function fixElementPosition(element) {
  element.style.position = "fixed";
}

function quadrantImage() {
  const image = new Image();
  fixElementPosition(image);
  image.style.maxWidth = "50%";
  image.style.maxHeight = "50%";
  hideElement(image);
  return image;
}

const topLeftImage = quadrantImage();
centerElementAtPercentage(topLeftImage, 25, 25);

const topRightImage = quadrantImage();
centerElementAtPercentage(topRightImage, 75, 25);

const bottomLeftImage = quadrantImage();
centerElementAtPercentage(bottomLeftImage, 25, 75);

const bottomRightImage = quadrantImage();
centerElementAtPercentage(bottomRightImage, 75, 75);

topLeftImage.src = "a.jpg";
topRightImage.src = "b.jpg";
bottomLeftImage.src = "c.jpg";
bottomRightImage.src = "d.jpg";

const videoElement = document.createElement("video");
fixElementPosition(videoElement);
centerElementAtPercentage(videoElement, 50, 50);
hideElement(videoElement);
videoElement.src = "video.ogv";

const buttonElement = document.createElement("button");
fixElementPosition(buttonElement);
centerElementAtPercentage(buttonElement, 50, 50);
buttonElement.textContent = "start";

document.body.appendChild(topLeftImage);
document.body.appendChild(topRightImage);
document.body.appendChild(bottomLeftImage);
document.body.appendChild(bottomRightImage);
document.body.appendChild(videoElement);
document.body.appendChild(buttonElement);

const video = new Video(videoElement);
const images = new Images([
  topLeftImage,
  topRightImage,
  bottomLeftImage,
  bottomRightImage,
]);
const trials = new Trials(video, images);
const startButton = new Button(buttonElement);
runTest(startButton, trials);
