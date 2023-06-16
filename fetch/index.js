import fs from "fs";
import ensurePath from "../ensurepath/index.js";

export class Fetch {
  constructor() {
    this.fetch = null;
  }

  get(url) {
    return new Promise(async (resolve, reject) => {
      if (!this.fetch) {
        this.fetch = (await import("node-fetch")).default;
      }
      this.fetch(url)
        .then((res) => {
          let contentType = res.headers.get("content-type") || "";
          if (contentType.indexOf("application/json") > -1) {
            return res.json();
          } else {
            return res.text();
          }
        })
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }

  download(url, dest) {
    return new Promise(async (resolve, reject) => {
      if (!this.fetch) {
        this.fetch = (await import("node-fetch")).default;
      }
      ensurePath(dest);
      if (fs.existsSync(dest)) {
        return resolve();
      }

      try {
        let res = await this.fetch(url);
        if (res.status !== 200) {
          return reject(res.statusText);
        }
        res.body.pipe(fs.createWriteStream(dest));
        return resolve();
      } catch (err) {
        return reject(err);
      }
    });
  }
}
