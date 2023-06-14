import fetch from "node-fetch";
import fs from "fs";
import ensurePath from "../ensurepath/index.js";

export class Fetch {
  constructor() {}

  get(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((res) => {
          if (res.headers["content-type"] === "application/json") {
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
      ensurePath(dest);
      if (fs.existsSync(dest)) {
        return resolve();
      }

      try {
        let res = await fetch(url);
        res.body.pipe(fs.createWriteStream(dest));
        return resolve();
      } catch (err) {
        return reject(err);
      }
    });
  }
}
