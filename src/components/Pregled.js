import { h, render, Component } from "preact";
import ciklusi from "./../image_info/ciklusi.js";
import { hiRes } from "./loadFunctions.js";

export class Pregled extends Component {
  //umesto galerije, pregled ce da bude obican  div sa slikama, i veliom marginom, da bi postigli istu iluziju
  render() {
    console.log("zovem render pregleda");
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
