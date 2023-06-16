import { Request } from "./index.js";

const request = new Request();

console.log(request);

request.setEngine("xhr");

(async () => {
  console.log("xhr");
  let res = await request.get("https://jsonplaceholder.typicode.com/todos/1");
  console.log(res);
  await request.download(
    "https://jsonplaceholder.typicode.com/todos/1",
    "./test.json"
  );

  console.log("fetch");
  request.setEngine("fetch");
  res = await request.get("https://jsonplaceholder.typicode.com/todos/1");
  console.log(res);
  await request.download(
    "https://jsonplaceholder.typicode.com/todos/1",
    "./test.json"
  );

  console.log("axios");
  request.setEngine("axios");
  res = await request.get("https://jsonplaceholder.typicode.com/todos/1");
  console.log(res);
  await request.download(
    "https://jsonplaceholder.typicode.com/todos/1",
    "./test.json"
  );

  console.log("got");
  request.setEngine("got");
  res = await request.get("https://jsonplaceholder.typicode.com/todos/1");
  console.log(res);
  await request.download(
    "https://jsonplaceholder.typicode.com/todos/1",
    "./test.json"
  );

  console.log("request");
  request.setEngine("request");
  res = await request.get("https://jsonplaceholder.typicode.com/todos/1");
  console.log(res);
  await request.download(
    "https://jsonplaceholder.typicode.com/todos/1",
    "./test.json"
  );
})();
