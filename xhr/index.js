import { XMLHttpRequest } from "xmlhttprequest";
import fs from "fs";
import ensurePath from "../ensurepath/index.js";

export class XHR {
  constructor() {}

  get(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(`Error: ${xhr.status}`);
        }
      };
      xhr.send();
    });
  }

  download(url, dest) {
    return new Promise(async (resolve, reject) => {
      ensurePath(dest);
      if (fs.existsSync(dest)) {
        return resolve();
      }

      try {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.responseType = "stream";
        xhr.onload = () => {
          if (xhr.status === 200) {
            xhr.response.pipe(fs.createWriteStream(dest));
            return resolve();
          } else {
            return reject(`Error: ${xhr.status}`);
          }
        };
        xhr.send();
      } catch (err) {
        return reject(err);
      }
    });
  }
}
