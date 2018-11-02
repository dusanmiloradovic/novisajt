import { h, render, Component } from "preact";

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
          <img src={"../../slk/news/" + obj[1]} />
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
