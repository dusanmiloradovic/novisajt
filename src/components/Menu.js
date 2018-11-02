import { h, render, Component } from "preact";
import backgroundCaptions from "./../image_info/background_images.js";
import { loadBackground, filesList } from "./loadFunctions.js";

const MOBILE = "ontouchstart" in document.documentElement;
const LOAD_AFTER = 5000;

export class Menu extends Component {
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
    //    if (!MOBILE) return;
    setTimeout(_ => {
      let newCounter = this.state.tekucaPozadina + 1;
      if (newCounter == filesList.length) newCounter = 0;
      loadBackground(newCounter);
      this.setState({ tekucaPozadina: newCounter });
      this.timeoutloop();
    }, LOAD_AFTER);
  }
}
