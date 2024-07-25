import { createHomePage } from "./dom/pages/home.js";

import backSvg from "../assets/chevron-left.svg";
import logo from "../assets/favicon.ico";
import "./styles/index.css";

console.log("Get Ready for Battle!");

const root = document.getElementById("root");
root.innerHTML = `
  <header>
    <button class="back-button"></button>
    <img class="logo" alt="Logo" /><h1>BLITZBAY</h1>
  </header>
`;

root.querySelector(".logo").src = logo;

root.appendChild(createHomePage());

const backButton = root.querySelector(".back-button");
const backIcon = new Image();
backIcon.src = backSvg;
backButton.appendChild(backIcon);
backButton.addEventListener("click", () => {
  const currentPage = root.querySelector(".page");
  const newPage = createHomePage();

  if (newPage.classList[0] == currentPage.classList[0]) {
    return;
  }

  root.className = "";

  root.appendChild(newPage);
  currentPage.remove();
});
