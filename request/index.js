import request from "request-promise-native";
import fs from "fs";
import ensurePath from "../ensurepath/index.js";

export class RequestEngine {
  constructor() {}

  get(url) {
    return new Promise((resolve, reject) => {
      request(url)
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
      ensurePath(dest);
      if (fs.existsSync(dest)) {
        return resolve();
      }

      try {
        const downloadStream = request(url);
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
