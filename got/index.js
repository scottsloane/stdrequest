import fs from "fs";
import ensurePath from "../ensurepath/index.js";

export class Got {
  constructor() {
    this.got = null;
  }

  get(url) {
    return new Promise(async (resolve, reject) => {
      if (!this.got) {
        this.got = (await import("got")).default;
      }
      this.got(url)
        .then((res) => {
          const contentType = res.headers["content-type"] || "";
          if (contentType.indexOf("application/json") > -1) {
            return resolve(JSON.parse(res.body));
          } else {
            return resolve(res.body);
          }
        })
        .catch((err) => reject(err));
    });
  }

  download(url, dest) {
    return new Promise(async (resolve, reject) => {
      if (!this.got) {
        this.got = (await import("got")).default;
      }
      ensurePath(dest);
      if (fs.existsSync(dest)) {
        return resolve();
      }

      try {
        const downloadStream = this.got.stream(url);
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
