//Api
//servers that are created for serving data for external use are reffered as API
//ex - customer(user) and sheff(server) - waiter (messenger/api) which serves the service from one pt to other pt

//CORS - cross origin resource sharing
//browsers restrict HTTP requests to outside sources
fetch("url", { mode: cors });
//fetch provides an easy, logical way to fetch resources asynchronously across the network.
//------------------------------------------------------------------------------


// Example POST method implementation:
async function postData(url = "", data = {}) {

  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

postData("https://example.com/answer", { answer: 42 }).then((data) => {
  console.log(data); // JSON data parsed by `data.json()` call
});
//----------------------------------------------------------------------------------------


//Uploading JSON data
const data = { username: "example" };

fetch("https://example.com/profile", {
  method: "POST", // or 'PUT'
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
})
  .then((response) => response.json())
  .then((data) => {
    console.log("Success:", data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
//------------------------------------------------------------------------------------------


//Uploading a file
const formData = new FormData();
const fileField = document.querySelector('input[type="file"]');

formData.append("username", "abc123");
formData.append("avatar", fileField.files[0]);

fetch("https://example.com/profile/avatar", {
  method: "PUT",
  body: formData,
})
  .then((response) => response.json())
  .then((result) => {
    console.log("Success:", result);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

//---------------------------------------------------------------------------------------------


//Uploading multiple files
const formData = new FormData();
const photos = document.querySelector('input[type="file"][multiple]');

formData.append("title", "My Vegas Vacation");
for (let i = 0; i < photos.files.length; i++) {
  formData.append("photos", photos.files[i]);
}
//fetch block is same as above
//--------------------------------------------------------------------------------------------


//Process text file line by line
async function makeTextFileLineIterator(fileURL) {
  const utf8Decoder = new TextDecoder("utf-8");
  const response = await fetch(fileURL);
  const reader = response.body.getReader();
  let { value: chunk, done: readerDone } = await reader.read();
  chunk = chunk ? utf8Decoder.decode(chunk) : "";

  const re = /\n|\r|\r\n/gm;
  let startIndex = 0;
  let result;

  for (;;) {
    let result = re.exec(chunk);
    if (!result) {
      if (readerDone) {
        break;
      }
      let remainder = chunk.substr(startIndex);
      ({ value: chunk, done: readerDone } = await reader.read());
      chunk = remainder + (chunk ? utf8Decoder.decode(chunk) : "");
      startIndex = re.lastIndex = 0;
      continue;
    }
    yield chunk.substring(startIndex, result.index);
    startIndex = re.lastIndex;
  }
  if (startIndex < chunk.length) {
    // last line didn't end in a newline char
    yield chunk.substr(startIndex);
  }
}

async function run() {
  for await (let line of makeTextFileLineIterator(urlOfFile)) {
    processLine(line);
  }
}

run();
//----------------------------------------------------------------------------------------


//A fetch() promise will reject with a TypeError when a network error is encountered or CORS is misconfigured on the server-side
//An accurate check for a successful fetch(),checking that the Response.ok property has a value of true.
fetch("flowers.jpg")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.blob();
  })
  .then()
  .catch();

//----------------------------------------------------------------------------------------


//Instead of passing a path to the resource you want to request into the fetch() call,
//you can create a request object using the Request() constructor,
const myHeaders = new Headers();

const myRequest = new Request("flowers.jpg", {
  method: "GET",
  headers: myHeaders,
  mode: "cors",
  cache: "default",
});

fetch(myRequest)
  .then((response) => response.blob())
  .then((myBlob) => {
    myImage.src = URL.createObjectURL(myBlob);
  });
//----------------------------------------------------------------------------


//Headers
//The Headers interface allows you to create your own headers object
const myHeaders = new Headers();
myHeaders.append("Content-Type", "text/plain");
myHeaders.append("Content-Length", content.length.toString());

//using object literal constructor
const myHeaders = new Headers({
  "Content-Type": "text/plain",
  "Content-Length": content.length.toString(),
  "X-Custom-Header": "ProcessThisImmediately",
});
//testing
console.log(myHeaders.has("Content-Type")); // true
console.log(myHeaders.has("Set-Cookie")); // false
myHeaders.set("Content-Type", "text/html");
myHeaders.append("X-Custom-Header", "AnotherValue");

console.log(myHeaders.get("Content-Length")); // 11
console.log(myHeaders.get("X-Custom-Header")); // ['ProcessThisImmediately', 'AnotherValue']

myHeaders.delete("X-Custom-Header");
console.log(myHeaders.get("X-Custom-Header")); // null

//All of the Headers methods throw a TypeError if a header name is used that is not a valid HTTP Header
fetch(myRequest)
  .then((response) => {
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new TypeError("Oops, we haven't got JSON!");
    }
    return response.json();
  })
  .then((data) => {
    /* process your data further */
  })
  .catch((error) => console.error(error));

//headers objects have a guard property which states which headers should update/modified 
/*
Possible guard values are:
none: default.
request: guard for a headers object obtained from a request (Request.headers).
request-no-cors: guard for a headers object obtained from a request created with Request.mode no-cors.
response: guard for a headers object obtained from a response (Response.headers).
immutable: guard that renders a headers object read-only; mostly used for ServiceWorkers.
// inserting Set-Cookie into a response header is not allowed
//You may not append or set the Content-Length header on a guarded headers object 
*/
//--------------------------------------------------------------------------------------

//Response Objects
/*
Response.status — An integer (default value 200) containing the response status code.
Response.statusText — A string (default value ""), which corresponds to the HTTP status code message.
Response.ok — seen in use above, this is a shorthand for checking that status is in the range 200-299 inclusive. This returns a Boolean.
*/
//--------------------------------------------------------------------------------------

/*
Both requests and responses may contain body data. A body is an instance of any of the following types:
ArrayBuffer
ArrayBufferView (Uint8Array and friends)
Blob/File
string
URLSearchParams
FormData

The Body mixin defines the following methods to extract a body (implemented by both Request and Response). 
These all return a promise that is eventually resolved with the actual content.

arrayBuffer()
blob()
json()
text()
formData()
This makes usage of non-textual data much easier than it was with XHR.
*/

//----------------------------------------------------------------------------
//list of apis
https://github.com/n0shake/Public-APIs