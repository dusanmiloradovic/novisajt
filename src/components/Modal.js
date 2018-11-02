import { h, render, Component } from "preact";

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
