import { h, render, Component } from "preact";
import Bricklayer from "bricklayer";
import "./slajder.css";
import thumbsrc from "./thumbsrc.js";
import "bricklayer/dist/bricklayer.min.css";
import contact from "./contact.txt";
import bio from "./bio.txt";
import news from "./whatsnew.js";
import {
  Slajder,
  SporaSlika,
  ResponsiveSlika,
  Modal,
  WhatsNew
} from "./komponente.js";
function Galerija(props) {
  return <div />;
}

//ako stavim galeriju u glavni ekran, ucitavace se sve slike iako galerija nije vidljiva, da bi bilo brze, stavicu da se ucitajavaju samo thumbovi

//TODO Umesto klasa, za svaki page dodaj rucno -n*100% ili n*100%, da bi mogli kod slajdovanja da rucno pomeramo to

class SlajderApp extends Component {
  render() {
    return (
      <div>
        <Slajder
          slike={thumbsrc}
          ref={sl => {
            this.slajder = sl;
          }}
        />
      </div>
    );
  }
  open() {
    this.slajder.open();
  }
}

class SlikeGalerije extends Component {
  render() {
    return (
      <PregledGalerije
        slike={thumbsrc}
        ref={sl => {
          this.galerija = sl;
        }}
      />
    );
  }
  open() {
    this.galerija.open();
  }
}

class PregledGalerije extends Component {
  //treba ipak da se izbace slicice pre pregleda.
  constructor() {
    super();
    this.state = {
      open: false
    };
  }

  render() {
    //	let srcsetfolders=["../slk/width320"];
    //	let breakpoints=["320w"];
    let thumbfolder = "../slk/thumb";
    let srcfolder = "../slk/width320";

    let els = this.props.slike.map((s, i) => {
      return (
        <div class="imggal">
          <ResponsiveSlika
            fitWidth="320px"
            key={"pregled" + i}
            order={i}
            fileName={s.fileName}
            srcfolder={srcfolder}
            loadbig={true}
            thumbfolder={thumbfolder}
            onclick={ev => this.openGal(i)}
          />
        </div>
      );
    });
    let galleryClass = this.state.open
      ? "gallery thumbs"
      : "gallery thumbds closed";
    let zatvoriClass = this.state.open ? "zatvorigal" : "zatvorigal closed";
    let zat = this.state.open ? (
      <a key="zatvori" class={zatvoriClass} href="#" onclick={this.close}>
        X
      </a>
    ) : (
      <div />
    );
    return (
      <div>
        <div class={galleryClass}>
          <div class="bricklayer" ref={_dom => (this.brick = _dom)}>
            {els}
          </div>
        </div>
        {zat}
      </div>
    );
  }
  componentDidUpdate() {
    if (!this.bricklayer) {
      this.bricklayer = new Bricklayer(this.brick);
    }
  }
  open() {
    this.setState({ open: true });
  }
  close = () => {
    this.setState({ open: false });
  };
  openGal = i => {
    this.close();
    let gal = window["app"];
    gal.open();
    gal.slajder.openFrom(i);
  };
}

window.addEventListener("load", function() {
  let ss1 = document.getElementById("galerija");
  render(
    <SlajderApp
      ref={app => {
        window["app"] = app;
      }}
    />,
    ss1
  );
  let galEl = document.getElementById("artwork");
  let contactEl = document.getElementById("contact");
  let bioEl = document.getElementById("bio");
  let currentEl = document.getElementById("current");

  galEl.addEventListener("click", () => {
    //				  window["app"].open();
    window["gal"].open();
  });
  render(
    <SlikeGalerije
      ref={app => {
        window["gal"] = app;
      }}
    />,
    ss1
  );

  render(
    <Modal wide ref={bio => (window["bio"] = bio)}>
      {bio}
    </Modal>,
    ss1
  );

  render(
    <Modal ref={contact => (window["contact"] = contact)}>{contact}</Modal>,
    ss1
  );

  render(
    <WhatsNew news={news} ref={whatsnew => (window["whatsnew"] = whatsnew)} />,
    ss1
  );

  bioEl.addEventListener("click", () => {
    window["bio"].open();
  });

  contactEl.addEventListener("click", () => {
    window["contact"].open();
  });

  currentEl.addEventListener("click", () => {
    window["whatsnew"].open();
  });
});
