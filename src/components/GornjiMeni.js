import { h, render, Component } from "preact";
import ResponsiveMenu from "react-responsive-navbar";
//import { FaBars, FaClose } from "react-icons/fa";
import { Modal } from "./Modal.js";
import { WhatsNew } from "./WhatsNew.js";

import contact from "../contact.txt";
import bio from "../bio.txt";
import news from "../whatsnew.js";

export class GornjiMeni extends Component {
  render() {
    console.log("zovem render gornjeg menija");
    let mnu = (
      <div class="respmenu">
        <ul>
          <li>
            <a
              href="#"
              onClick={_ => {
                this.rm.setState({ showMenu: false });
                window["bio"].open();
                ga("send", { hitType: "pageview", page: "/bio", title: "Bio" });
              }}
            >
              Bio
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={_ => {
                this.rm.setState({ showMenu: false });
                window["contact"].open();
                ga("send", {
                  hitType: "pageview",
                  page: "/contact",
                  title: "Contact"
                });
              }}
            >
              Contact
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={_ => {
                this.rm.setState({ showMenu: false });
                window["whatsnew"].open();
                ga("send", {
                  hitType: "pageview",
                  page: "/whatsnew",
                  title: "What's new"
                });
              }}
            >
              News
            </a>
          </li>
        </ul>
      </div>
    );

    //  let mnuOpenButton = <FaBars size={30} />;
    //let mnuCloseButton = <FaClose size={30} />;
    let mnuOpenButton = <div>&#x2630;</div>;
    let mnuCloseButton = <div>X</div>;

    return (
      <div>
        <ResponsiveMenu
          menuOpenButton={mnuOpenButton}
          menuCloseButton={mnuCloseButton}
          changeMenuOn="500px"
          largeMenuClassName="large-menu"
          smallMenuClassName="small-menu"
          menu={mnu}
          ref={m => (this.rm = m)}
        />
        <Modal wide ref={bio => (window["bio"] = bio)}>
          {bio}
        </Modal>
        <Modal ref={contact => (window["contact"] = contact)}>{contact}</Modal>
        <WhatsNew
          news={news}
          ref={whatsnew => (window["whatsnew"] = whatsnew)}
        />
      </div>
    );
  }
}
