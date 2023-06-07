# stdrequest

StdRequest is a WIP wrapper around various request libraries to allow for easy integration and switching of these packages within simple projects

## Usage

**Import**
```js
import { Request } from "stdrequest";

const request = new Request();
```

**Set Engine**
```js
request.setEngine("fetch");
```
*Options:* xhr, fetch, axios, got

**Make Request**
```js
(async()=>{
    res = await request.get("https://jsonplaceholder.typicode.com/todos/1");
})();
```