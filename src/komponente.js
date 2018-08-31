import { h, render, Component } from "preact";

var promLoaded = new Promise(function(resolve, reject) {
  if (document.readyState == "complete") {
    resolve("ok");
  } else {
    window.addEventListener("load", ev => {
      resolve("ok");
    });
  }
});

export class Slajder extends Component {
  constructor() {
    super();
    this.state = {
      tekuca: 0,
      slajding: false,
      touchdevice: false,
      open: false,
      loadFinish: false //kada se ucita cela stranica, tek tada pocni da ucitavas velike slike
    };
    let f = e => {
      this.setState({ touchdevice: true });
      window.removeEventListener("touchstart", f);
      this.startSlajdTouch(e);
    };

    if (!this.state.touchdevice) {
      window.addEventListener("touchstart", f);
    }

    promLoaded.then(_ => {
      this.setState({ loadFinish: true });
    });
  }
  render() {
    let thumbfolder = "../slk/thumb";
    let srcfolder = "../slk/width320";
    let breakpoints = ["1300w", "1024w", "800w", "320w"];
    let srcsetfolders = [
      "../slk/height1024",
      "../slk/height700",
      "../slk/height500",
      "../slk/width320"
    ];

    let gal = this.props.slike.map((s, i) => {
      let delta = 0;
      if (this.state.slajding) {
        delta = (this.state.tekX - this.state.pocX) / window.innerWidth;
      }
      let curr = (i - this.state.tekuca + delta) * 100;
      let stl = "transform:translate3d(" + curr + "%,0,0)";

      return (
        <div class="page" style={stl} key={"sporaslika-" + i} data-pic-ix={i}>
          <ResponsiveSlika
            rasiri={true}
            loadbig={this.state.loadFinish}
            srcfolder={srcfolder}
            thumbfolder={thumbfolder}
            srcsetfolders={srcsetfolders}
            breakpoints={breakpoints}
            fileName={s.fileName}
          />
        </div>
      );
    });

    let evb = this.state.touchdevice
      ? {
          ontouchstart: this.startSlajdTouch,
          ontouchmove: this.slajdiranjeTouch,
          ontouchend: this.gotovSlajdTouch
        }
      : {
          onmousedown: this.startSlajd,
          onmousemove: this.slajdiranje,
          onmouseup: this.gotovSlajd
        };

    let leftArrow =
      this.state.tekuca == 0 ? (
        <div />
      ) : (
        <a key="left-arrow" class="arrowleft" onclick={this.moveLeft} href="#">
          <span />
        </a>
      );
    let rightArrow =
      this.state.tekuca == this.props.slike.length - 1 ? (
        <div />
      ) : (
        <a
          key="right-arrow"
          class="arrowright"
          onclick={this.moveRight}
          href="#"
        >
          <span />
        </a>
      );

    let sl = this.props.slike[this.state.tekuca];
    let tekuciLabel = sl.title ? sl.title : sl.fileName;

    let galleryClass = this.state.open ? "gallery" : "gallery closed";
    let zat = this.state.open ? (
      <a key="zatvori" class="zatvori" href="#" onclick={this.close}>
        X
      </a>
    ) : (
      <div />
    );
    return (
      <div class={galleryClass} {...evb}>
        {leftArrow}
        {gal}
        {rightArrow}
        {zat}
        <div class="label">
          <pre>{tekuciLabel}</pre>
        </div>
        ;
      </div>
    );
  }

  moveRight = () => {
    if (this.state.tekuca == this.props.slike.length - 1) {
      return;
    }

    this.setState({ tekuca: this.state.tekuca + 1 });
  };

  moveLeft = () => {
    if (this.state.tekuca == 0) {
      return;
    }
    this.setState({ tekuca: this.state.tekuca - 1 });
  };

  close = () => {
    this.setState({ open: false });
  };

  open() {
    this.setState({ open: true });
  }

  openFrom(n) {
    this.setState({ tekuca: n, open: true });
  }

  startSlajdTouch = e => {
    this.startSlajd(e.touches[0]);
  };

  slajdiranjeTouch = e => {
    this.slajdiranje(e.touches[0]);
  };

  gotovSlajdTouch = e => {
    this.gotovSlajd(e.touches[0]);
  };

  startSlajd = e => {
    this.setState({ slajding: true, pocX: e.clientX, tekX: e.clientX });
  };

  slajdiranje = e => {
    if (!this.state.slajding) {
      return;
    }
    this.setState({ tekX: e.clientX });
  };

  gotovSlajd = e => {
    if (!this.state.slajding) {
      return;
    }

    this.setState({ slajding: false });
    let pomeraj = this.state.tekX - this.state.pocX;

    if (Math.abs(pomeraj) < window.innerWidth / 3) {
      return;
    }

    if (pomeraj < 0) {
      this.moveRight();
    } else {
      this.moveLeft();
    }
  };
}

export class SporaSlika extends Component {
  stopdrag = e => {
    e.preventDefault();
    return false;
  };

  render() {
    let iss = {};
    if (this.props.fitWidth) {
      iss = { style: { width: this.props.fitWidth } };
    }
    let klz = this.props.rasiri ? "slika" : "noslika";
    let condImg = this.props.loadbig ? (
      <img
        class={klz}
        onload={ev => this.setState({ slikaUcitana: true })}
        srcset={this.props.srcset}
        sizes={this.props.sizes}
        src={this.props.src}
      />
    ) : (
      <div />
    );
    if (this.state.slikaUcitana) {
      let ss = {};
      if (this.props.onclick) {
        ss.onClick = this.props.onclick;
      }

      return (
        <img
          ondragstart={this.stopdrag}
          class={klz}
          srcset={this.props.srcset}
          sizes={this.props.sizes}
          src={this.props.src}
          {...ss}
        />
      );
    }
    return (
      <div style="height:100%;width:100%">
        <img class={klz + " thumb"} src={this.props.thumbsrc} {...iss} />
        <div style="display:none">{condImg}</div>
      </div>
    );
  }
}

export class ResponsiveSlika extends Component {
  //da ne mora da se kuca , samo folderi
  //srcetfolders --
  //breakpoints - odgovara svakom folderu gore
  //srcfolder - fallback
  //thumbdolder - u stvari ovo nije thumb nego samo placeholder kada se slika ucitaba
  //filename
  //sizes cu da stavim na 100vw
  //loadbig

  render() {
    let ss = {};
    if (this.props.breakpoints) {
      //mogu da budu i obicne slike(da nisu responsive - bez breakpointa)
      let srcset = "";
      for (let j = 0; j < this.props.breakpoints.length; j++) {
        srcset +=
          (srcset == "" ? "" : ",") +
          this.props.srcsetfolders[j] +
          "/" +
          this.props.fileName +
          " " +
          this.props.breakpoints[j];
      }
      ss = { srcset: srcset, sizes: "100vw" };
    }

    return (
      <SporaSlika
        {...ss}
        fitWidth={this.props.fitWidth}
        src={this.props.srcfolder + "/" + this.props.fileName}
        loadbig={this.props.loadbig}
        thumbsrc={this.props.thumbfolder + "/" + this.props.fileName}
        rasiri={this.props.rasiri}
        order={this.props.order}
        onclick={this.props.onclick}
      />
    );
  }
}

export class Modal extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
  }

  render() {
    let zat = this.state.open ? (
      <a key="zatvori" class="zatvorigal" href="#" onclick={this.close}>
        X
      </a>
    ) : (
      <div />
    );
    let kls = "gallery card";
    let modal = "modal";
    if (this.props.wide) {
      modal += " wide";
    }
    if (!this.state.open) {
      kls += " closed";
    }
    return (
      <div class="tr123">
        <div class={kls}>
          <div class={modal} ref={m => (this.modal = m)}>
            <pre>{this.props.children}</pre>
          </div>
        </div>
        {zat}
      </div>
    );
  }

  open() {
    this.setState({ open: true });
  }
  close = () => {
    this.setState({ open: false });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.open != prevState.open) {
      if (this.modal.scrollHeight < window.innerHeight) {
        this.modal.classList.add("fit");
      } else {
        this.modal.classList.remove("fit");
      }
    }
  }
}

export class WhatsNew extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
  }

  render() {
    let zat = this.state.open ? (
      <a key="zatvori" class="zatvorigal" href="#" onclick={this.close}>
        X
      </a>
    ) : (
      <div />
    );
    let rez = [];
    let kls = "gallery card";
    if (!this.state.open) {
      kls += " closed";
    }
    for (let i = 0; i < this.props.news.length; i++) {
      let obj = this.props.news[i];
      rez.push(
        <div>
          <pre>{obj[0]}</pre>
        </div>
      );
      rez.push(
        <div>
          <img src={"../slk/news/" + obj[1]} />
        </div>
      );
    }
    return (
      <div class="tr123">
        <div class={kls}>
          <div class="whatsnew" ref={m => (this.modal = m)}>
            {rez}
          </div>
        </div>
        {zat}
      </div>
    );
  }

  open() {
    this.setState({ open: true });
  }

  close = () => {
    this.setState({ open: false });
  };
}
