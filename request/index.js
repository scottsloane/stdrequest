import fs from "fs";
import ensurePath from "../ensurepath/index.js";

export class RequestEngine {
  constructor() {
    this.request = null;
  }

  get(url) {
    return new Promise(async (resolve, reject) => {
      console.warn(
        "Request Engine is deprecated. Please use a different Engine instead."
      );
      if (!this.request) {
        this.request = (await import("request-promise-native")).default;
      }
      this.request(url)
        .then((res) => {
          try {
            let o = JSON.parse(res);
            return resolve(o);
          } catch (err) {
            return resolve(res);
          }
        })
        .catch((err) => reject(err));
    });
  }

  download(url, dest) {
    return new Promise(async (resolve, reject) => {
      console.warn(
        "Request Engine is deprecated. Please use a different Engine instead."
      );
      if (!this.request) {
        this.request = (await import("request-promise-native")).default;
      }
      ensurePath(dest);
      if (fs.existsSync(dest)) {
        return resolve();
      }

      try {
        const downloadStream = this.request(url);
        const fileStream = fs.createWriteStream(dest);
        downloadStream.pipe(fileStream);

        downloadStream.on("error", (error) => {
          return reject(error);
        });

        fileStream.on("finish", () => {
          return resolve();
        });
      } catch (err) {
        return reject(err);
      }
    });
  }
}
