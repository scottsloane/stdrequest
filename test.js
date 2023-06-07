import { Request } from "./index.js";

const request = new Request();

console.log(request);

request.setEngine("xhr");

(async () => {
  let res = await request.get("https://jsonplaceholder.typicode.com/todos/1");
  console.log(res);

  request.setEngine("fetch");
  res = await request.get("https://jsonplaceholder.typicode.com/todos/1");
  console.log(res);

  request.setEngine("axios");
  res = await request.get("https://jsonplaceholder.typicode.com/todos/1");
  console.log(res);

  request.setEngine("got");
  res = await request.get("https://jsonplaceholder.typicode.com/todos/1");
  console.log(res);
})();
