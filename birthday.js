const cloudContainer = document.querySelector(".cloud-container");


const cloudImages = [
  "Media/cloud-1.png",
  "Media/cloud-2.png",
  "Media/cloud-3.png"
];


function createCloud(initial = false) {

  const cloud = document.createElement("img");


  // Random cloud image
  cloud.src = cloudImages[Math.floor(Math.random() * cloudImages.length)];

  cloud.className = "cloud-svg";
  cloud.alt = "";


  // Random height (dvh instead of vh so clouds stay put correctly as
  // Safari's toolbar shows/hides on iOS)
  let cloudHeight = Math.random();

  if (cloudHeight < 0.5) {
      cloud.style.top = Math.random() * 25 + "dvh";
  } else {
      cloud.style.top = Math.random() * 25 + 70 + "dvh";
  }


  // Random size
  const size = Math.random() * 150 + 100;
  cloud.style.width = size + "px";


  // Random speed
  const speed = Math.random() * 30 + 35;
  cloud.style.animationDuration = speed + "s";


  // Random direction
  if (Math.random() > 0.5) {
    cloud.style.animationName = "moveRight";
  } 
  else {
    cloud.style.animationName = "moveLeft";
  }


  // Clouds should stay fully off-screen at first and glide in smoothly.
  // The CSS keyframes already start every cloud at -400px/+400px off the
  // edge of the screen, so nothing extra is needed here for the initial
  // batch — leaving "left" at its default keeps them off-screen without
  // stacking on an extra buffer that would make them take too long to
  // glide into view.

  cloudContainer.appendChild(cloud);


  // Remove cloud after it leaves the screen
  cloud.addEventListener("animationend", () => {
    cloud.remove();
  });
}



function startClouds() {

  // Create clouds immediately
  for (let i = 0; i < 5; i++) {
    createCloud(true);
  }


  // Generate new clouds
  setInterval(() => {

    // Maximum 20 clouds
    if (document.querySelectorAll(".cloud-svg").length < 20) {
      createCloud();
    }

  }, 4000);

}


startClouds();


const fishContainer = document.querySelector(".fish-container");


const fishImages = [
  "Media/fish-1.png",
  "Media/fish-2.png",
  "Media/fish-3.png",
  "Media/fish-4.png"
];

const MAX_FISH = 20;


function createFish() {

  // Maximum fish on screen at once, same idea as the cloud cap
  if (document.querySelectorAll(".fish-svg").length >= MAX_FISH) {
    return;
  }

  const fish = document.createElement("img");

  // Random fish image
  fish.src = fishImages[Math.floor(Math.random() * fishImages.length)];

  fish.className = "fish-svg";
  fish.alt = "";


  // Random fish size
  const size = Math.random() * 80 + 50;
  fish.style.width = size + "px";


  // Random direction
  let direction = Math.random() > 0.5 ? 1 : -1;


  // Random starting height
  let y;

  if (Math.random() > 0.5) {
      y = Math.random() * 20 + 10;
  } else {
      y = Math.random() * 20 + 70;
  }


  fishContainer.appendChild(fish);


  // Start outside screen
  let x;

  const fishDistance = window.innerWidth * 0.35;

  if (direction === 1) {
      x = -fishDistance;
  } else {
      x = window.innerWidth + fishDistance;
  }


  // Swimming speed
  let speed = Math.random() * 0.8 + 0.5;


  // Sine wave movement
  let amplitude = Math.random() * 20 + 20;
  let frequency = Math.random() * 0.004 + 0.003;


  // Rotation amount
  let rotationAmount = 12;


  function swim() {

    // Move horizontally
    x += speed * direction;


    // Calculate wave movement
    let wave = Math.sin(x * frequency) * amplitude;


    // Calculate rotation based on wave direction
    let movement = Math.cos(x * frequency);

    let angle = movement * rotationAmount;


    // Flip fish when swimming left
    if (direction === 1) {
      fish.style.transform = `rotate(${angle}deg)`;
    } 
    else {
      fish.style.transform = `rotate(${angle}deg) scaleX(-1)`;
    }


    // Position fish (dvh instead of vh, same reasoning as the clouds)
    fish.style.left = x + "px";
    fish.style.top = (y + wave / 3) + "dvh";


    // Remove fish after leaving screen
    if (
      (direction === 1 && x > window.innerWidth + 300) ||
      (direction === -1 && x < -300)
    ) {
      fish.remove();
      return;
    }


    requestAnimationFrame(swim);
  }


  swim();
}


// Generate some fish immediately
for (let i = 0; i < 5; i++) {
  createFish();
}


// Keep generating fish
setInterval(() => {
  createFish();
}, 5000);

if (window.innerWidth < 600) {

    for (let i = 0; i < 2; i++) {
        createFish();
        createCloud(true);
    }

}

const centerFish = document.getElementById("centerFish");
const centerCloud = document.getElementById("centerCloud");
const video = document.getElementById("birthdayVideo");

let opened = false;


if (centerFish && centerCloud && video) {

    function openBirthday(event) {

        event.stopPropagation();

        if (opened) return;

        opened = true;

        centerFish.classList.add("fish-up");
        centerCloud.classList.add("cloud-down");

        video.classList.remove("hidden-video");
        video.classList.add("show");

        video.play();

    }


    centerFish.addEventListener("click", openBirthday);
    centerCloud.addEventListener("click", openBirthday);


    document.addEventListener("click", (event) => {

    if (!opened) return;


    // If the click is inside the video, ignore it
    if (video.contains(event.target)) {
        return;
    }


    opened = false;

    centerFish.classList.remove("fish-up");
    centerCloud.classList.remove("cloud-down");

    video.pause();
    video.currentTime = 0;

    video.classList.remove("show");

   });

}
