import { XHR } from "./xhr/index.js";
import { Fetch } from "./fetch/index.js";
import { Axios } from "./axios/index.js";
import { Got } from "./got/index.js";

export class Request {
  constructor() {
    this.engine = new XHR();
  }

  setEngine(engine) {
    switch (engine) {
      case "xhr":
        this.engine = new XHR();
        break;
      case "fetch":
        this.engine = new Fetch();
        break;
      case "axios":
        this.engine = new Axios();
        break;
      case "got":
        this.engine = new Got();
        break;
      default:
        throw new Error("Invalid engine");
    }
  }

  get(url) {
    return this.engine.get(url);
  }

  download(url, dest) {
    return this.engine.download(url, dest);
  }
}
