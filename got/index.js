import got from "got";

export class Got {
  constructor() {}

  get(url) {
    return new Promise((resolve, reject) => {
      got(url)
        .then((res) => resolve(res.body))
        .catch((err) => reject(err));
    });
  }
}
