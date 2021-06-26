//Task 1
//rewrite using async/await
function loadJson(url) {
  return fetch(url).then((response) => {
    if (response.status == 200) {
      return response.json();
    } else {
      throw new Error(response.status);
    }
  });
}
loadJson("no-such-user.json").catch(alert); // Error: 404

//ans
async function loadJson() {
  const response = await fetch(url);
  if (response.status == 200) {
    return response.json();
  } else throw new Error(response.status);
}
loadJson("no-such-user.json").then(res => console.log(res)).catch(alert);
//----------------------------------------------------------------------------------------


//Task 2
class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = "HttpError";
    this.response = response;
  }
}

function loadJson(url) {
  return fetch(url).then((response) => {
    if (response.status == 200) {
      return response.json();
    } else {
      throw new HttpError(response);
    }
  });
}

// Ask for a user name until github returns a valid user
function demoGithubUser() {
  let name = prompt("Enter a name?", "iliakan");

  return loadJson(`https://api.github.com/users/${name}`)
    .then((user) => {
      alert(`Full name: ${user.name}.`);
      return user;
    })
    .catch((err) => {
      if (err instanceof HttpError && err.response.status == 404) {
        alert("No such user, please reenter.");
        return demoGithubUser();
      } else {
        throw err;
      }
    });
}
demoGithubUser().catch();

//ans
async function loadJson(url) {
  const response = await fetch(url);
  if (response.status == 200) {
    return response.json();
  } else {
    throw new HttpError(response);
  }
}

async function demoGithubUser() {
  let name = prompt("Enter a name?", "iliaken");
  try {
    const user = await loadJson(url);
    alert("Full name: ", user.name);
    return user;
  } catch (err) {
    if (err instanceof HttpError && err.response.status == 404) {
      alert("No such user, please reenter.");
      return demoGithubUser();
    } else {
      throw err;
    }
  }
}

demoGithubUser().catch();
//------------------------------------------------------------------------------


//Task 3
async function wait() {
  await new Promise((resolve) => setTimeout(resolve, 1000));  
  return 10;
}

function f() {
  // ...what should you write here?
  // we need to call async wait() and wait to get 10
  // remember, we can't use "await"
  wait().then((res) => alert(res));
}
//----------------------------------------------------------------