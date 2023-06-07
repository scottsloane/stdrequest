import { XMLHttpRequest } from "xmlhttprequest";

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
}
