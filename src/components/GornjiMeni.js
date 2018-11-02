import { h, render, Component } from "preact";
import { ResponsiveMenu } from "react-responsive-navbar";
import { FaBars, FaClose } from "react-icons/fa";

export class GornjiMeni extends Component {
  render() {
    let mnu = (
      <div class="respmenu">
        <ul>
          <li>
            <a href="">Home</a>
          </li>
          <li>
            <a href="">About</a>
          </li>
          <li>
            <a href="">Team</a>
          </li>
          <li>
            <a href="">Contact</a>
          </li>
          <li>
            <a href="">News</a>
          </li>
        </ul>
      </div>
    );

    let mnuOpenButton = <FaBars size={30} />;
    let mnuCloseButton = <FaClose size={30} />;

    return (
      <ResponsiveMenu
        menuOpenButton={mnuOpenButton}
        menuCloseButton={mnuCloseButton}
        changeMenuOn="500px"
        largeMenuClassName="large-menu"
        smallMenuClassName="small-menu"
        menu={mnu}
      />
    );
  }
}
