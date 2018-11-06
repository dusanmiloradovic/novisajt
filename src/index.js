import { h, render, Component } from "preact";
//import "./slajder.css";
import "./scss/background.scss";
import "./scss/main.scss";
import contact from "./contact.txt";
import bio from "./bio.txt";
import news from "./whatsnew.js";

import "./fonts/bebas_neue/stylesheet.css";
import backgroundCaptions from "./image_info/background_images.js";

import { GornjiMeni } from "./components/GornjiMeni.js";
import { Menu } from "./components/Menu.js";
import { Pregled } from "./components/Pregled.js";
import {
  preloadImage,
  loadBackground,
  loadImages,
  hiRes
} from "./components/loadFunctions.js";

let imageCounter = 0;
let timeoutRun = true;

loadImages();
//timeoutLoop(); //stavi samo za mobilni

window.oncontextmenu = () => false;

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
        <div onClick={_ => this.setState({ aktivniCiklus: -1 })} class="ruzica">
          <a href="#">Ruzica Simonic</a>
        </div>
        <GornjiMeni />
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
