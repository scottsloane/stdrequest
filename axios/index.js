import fs from "fs";
import ensurePath from "../ensurepath/index.js";

export class Axios {
  constructor() {
    this.axios = null;
  }

  get(url) {
    return new Promise(async (resolve, reject) => {
      if (!this.axios) {
        this.axios = (await import("axios")).default;
      }
      this.axios
        .get(url)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  download(url, dest) {
    return new Promise(async (resolve, reject) => {
      if (!this.axios) {
        this.axios = (await import("axios")).default;
      }
      ensurePath(dest);
      if (fs.existsSync(dest)) {
        return resolve();
      }

      try {
        const writer = fs.createWriteStream(dest);
        const response = await axios({
          url,
          method: "GET",
          responseType: "stream",
        });

        response.data.pipe(writer);

        writer.on("finish", () => {
          return resolve();
        });

        writer.on("error", (err) => {
          return reject(err);
        });
      } catch (err) {
        return reject(err);
      }
    });
  }
}
