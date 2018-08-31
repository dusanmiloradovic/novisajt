import { h, render, Component } from "preact";
//import "./slajder.css";
import "./scss/background.scss";
import "./scss/main.scss";
import contact from "./contact.txt";
import bio from "./bio.txt";
import news from "./whatsnew.js";
import styles from "./scss/variables.scss";
import "./fonts/bebas_neue/stylesheet.css";
import backgroundCaptions from "./image_info/background_images.js";

const filesList = styles.filesList.split(" ");

let currBackground = 0;
let currBackgroundClass = null;

//this will be the index of the background image to be displayed to the user. On the desktop, when the user hovers, the image will be changed. On mobile every 10 secs.

console.log(filesList);

let loadedBGImages = new Array(filesList.length);
for (let j = 0; j < loadedBGImages.length; j++) {
  loadedBGImages[j] = false;
}

const hiRes = require.context("../slk/height1024", true);
const medRes = require.context("../slk/height700", true);
const lowRes = require.context("../slk/height500", true);

const choosenRes = !window.screen
  ? hiRes
  : window.screen.width > 1600
    ? hiRes
    : window.screen.width < 700
      ? lowRes
      : medRes;

const preloadImage = ind => {
  return new Promise((resolve, reject) => {
    let img = new Image();
    let pth = "./" + filesList[ind] + ".jpg";
    img.src = choosenRes(pth);
    img.onload = () => {
      loadedBGImages[ind] = true;
      resolve("loaded");
    };
    img.onerror = err => {
      reject(err);
    };
    img.onabort = () => {
      reject("aborted");
    };
  });
};

const loadBackground = ind => {
  //it will try to load the image to the browser cache first. When it is loaded it changes the background
  if (currBackgroundClass) {
    document.documentElement.classList.remove(currBackgroundClass);
  }
  currBackgroundClass = "main-bg-" + (ind + 1);
  document.documentElement.classList.add(currBackgroundClass);
  if (loadedBGImages[ind]) {
    return Promise.resolve(ind);
  } else {
    document.documentElement.classList.add("thumb");

    return preloadImage(ind).then(_ => {
      document.documentElement.classList.remove("thumb");
    });
  }
};

const loadImages = () => {
  //wait for the first image to load, then loads the rest
  loadBackground(0).then(() => {
    for (let j = 1; j < filesList.length; j++) {
      //skip first, alerady loaded
      preloadImage(j);
    }
  });
};

const MOBILE = "ontouchstart" in document.documentElement;
const LOAD_AFTER = 5000;
let imageCounter = 0;
let timeoutRun = true;

loadImages();
//timeoutLoop(); //stavi samo za mobilni

class Menu extends Component {
  constructor() {
    super();
    this.state = {
      tekucaPozadina: 0
    };
    this.timeoutloop();
  }
  render() {
    let links = backgroundCaptions.map((c, ind) => (
      <li
        onMouseEnter={ev => {
          this.setState({ tekucaPozadina: ind });
          loadBackground(ind);
        }}
      >
        <a
          class={ind == this.state.tekucaPozadina ? "selected" : ""}
          href="#"
          id={"background-" + ind}
        >
          {c}
        </a>
      </li>
    ));
    return (
      <div class="menu">
        <ul>{links}</ul>
      </div>
    );
  }
  timeoutloop() {
    if (!MOBILE) return;
    setTimeout(_ => {
      let newCounter = this.state.imageCounter + 1;
      loadBackground(newCounter);
      this.setState({ imageCounter: newCounter });
      this.timeoutloop();
    }, LOAD_AFTER);
  }
}

window.addEventListener("load", _ => {
  let st = document.getElementById("root");
  render(<Menu />, st);
});
