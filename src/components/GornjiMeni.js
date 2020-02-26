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
                gtag("config", "UA-158829596-1", {
                  page_title: "Bio",
                  page_path: "/bio"
                });
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
                gtag("config", "UA-158829596-1", {
                  page_title: "Contact",
                  page_path: "/contact"
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
                gtag("config", "UA-158829596-1", {
                  page_title: "What's new",
                  page_path: "/whatsnew"
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
