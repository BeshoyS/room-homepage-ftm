import sliderData from "../data/sliderData.json" assert { type: "json" };
const navMenu = document.getElementById("primary-nav");
const openMenu = document.getElementById("navbarHam");
const closeMenu = document.getElementById("navbarClose");
const navOverlay = document.getElementById("NavOverlay");
const arrowPrev = document.getElementById("arrowPrev");
const arrowNext = document.getElementById("arrowNext");
const slider = document.getElementById("slider");
const heroContent = document.getElementById("heroContent");
let currentIndex = 0;

let openMenuFcn = function () {
  openMenu.setAttribute("aria-expanded", true);
  navMenu.setAttribute("data-visible", true);
  navOverlay.style.display = "block";
};
let closeMenuFcn = function () {
  closeMenu.setAttribute("aria-expanded", false);
  navMenu.setAttribute("data-visible", false);
  navOverlay.style.display = "none";
};

openMenu.addEventListener("click", openMenuFcn);
closeMenu.addEventListener("click", closeMenuFcn);
navOverlay.addEventListener("click", closeMenuFcn);

let slideFcn = function (i) {
  currentIndex += i;
  if (currentIndex === sliderData.length) {
    currentIndex = 0;
  } else if (currentIndex === -1) {
    currentIndex = sliderData.length - 1;
  }
  const { title, desc, img } = sliderData[currentIndex];
  slider.querySelector("source").srcset = img.desktop;
  slider.querySelector("#heroImg").src = img.mobile;
  heroContent.querySelector(".title").innerHTML = title;
  heroContent.querySelector(".desc").innerHTML = desc;
};

arrowNext.addEventListener("click", () => slideFcn(1));
arrowPrev.addEventListener("click", () => slideFcn(-1));

document.addEventListener("keydown", function ({ key }) {
  key === "ArrowRight"
    ? slideFcn(1)
    : key === "ArrowLeft"
    ? slideFcn(-1)
    : key === "Escape" && navMenu.getAttribute("data-visible") === "true"
    ? closeMenuFcn()
    : null;
});
