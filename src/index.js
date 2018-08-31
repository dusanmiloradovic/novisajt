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
import ciklusi from "./image_info/ciklusi.js";

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

const preloadImage = ind => {
  return new Promise((resolve, reject) => {
    let img = new Image();
    let pth = "./" + filesList[ind] + ".jpg";
    img.src = hiRes(pth).src; //resposive loader treba da o ovome vodi racuna
    img.srcset = hiRes(pth).srcSet;
    img.srcSet = hiRes(pth).srcSet;
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
          onClick={ev => this.props.zoviFunkciju(ind)}
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
      let newCounter = this.state.tekucaPozadina + 1;
      if (newCounter == filesList.length) newCounter = 0;
      loadBackground(newCounter);
      this.setState({ tekucaPozadina: newCounter });
      this.timeoutloop();
    }, LOAD_AFTER);
  }
}

class Pregled extends Component {
  //umesto galerije, pregled ce da bude obican  div sa slikama, i veliom marginom, da bi postigli istu iluziju
  render() {
    let slike = ciklusi[this.props.ciklus];
    let sl = slike.map(s => {
      let im = hiRes("./" + s.fajl);

      return (
        <div class="img-ciklus">
          <img srcSet={im.srcSet} src={im.images[im.images.length - 1].path} />
        </div>
      );
    });
    return <div class="ciklus-pregled">{sl}</div>;
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = { aktivniCiklus: -1 };
  }

  render() {
    let st =
      this.state.aktivniCiklus != -1 ? (
        <Pregled ciklus={this.state.aktivniCiklus} />
      ) : (
        <div />
      );
    return (
      <div>
        <Menu zoviFunkciju={x => this.setState({ aktivniCiklus: x })} />
        {st}
      </div>
    );
  }
}

window.addEventListener("load", _ => {
  let st = document.getElementById("root");
  render(<App />, st);
});
