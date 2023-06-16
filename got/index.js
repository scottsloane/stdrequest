import got from "got";
import fs from "fs";
import ensurePath from "../ensurepath/index.js";

export class Got {
  constructor() {}

  get(url) {
    return new Promise((resolve, reject) => {
      got(url)
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
      ensurePath(dest);
      if (fs.existsSync(dest)) {
        return resolve();
      }

      try {
        const downloadStream = got.stream(url);
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
