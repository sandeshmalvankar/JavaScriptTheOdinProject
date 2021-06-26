//async keyword used to make function asynchronous
//requires to use await inside function , its like then in promise
//async function will always return new Promise

//----------------------------------------------------------------
const yourAsyncFunction = async () => {
  // do something asynchronously and return a promise
  return result;
};
//-----
anArray.forEach(async (item) => {
  // do something asynchronously for each item in 'anArray'
  // one could also use .map here to return an array of promises to use with 'Promise.all()'
});
//-----
server.getPeople().then(async (people) => {
  people.forEach((person) => {
    // do something asynchronously for each person
  });
});
//----------------------------------------------------------------


//Handling erros in async function
asyncFunctionCall().catch((err) => {
  console.error(err);
});
//--Using try-catch inside function
async function getPersonsInfo(name) {
  try {
    const people = await server.getPeople();
    const person = people.find((person) => {
      return person.name === name;
    });
    return person;
  } catch (error) {
    // Handle the error 
  }
}
//----------------------------------------------------------------


class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve);
    // resolve with this.num*2 after 1000ms
    setTimeout(() => resolve(this.num * 2), 1000); // (*)
  }
}

async function f() {
  // waits for 1 second, then result becomes 2
  let result = await new Thenable(1);
  alert(result);
}

f();
//If await gets a non-promise object with .then, it calls that method providing the built-in functions resolve and reject as arguments (just as it does for a regular Promise executor).
//Then await waits until one of them is called (in the example above it happens in the line (*)) and then proceeds with the result.
//--------------------------------------------------------------------------------


//Async class methods
class Waiter {
  async wait() {
    return await Promise.resolve(1);
  }
}

new Waiter().wait().then(alert); // 1 (this is the same as (result => alert(result)))
//----------------------------------------------------------------------------------------------


//Error Handling
async function f() {
  await Promise.reject(new Error("Whoops!"));
}

//…is the same as this:
async function f() {
  throw new Error("Whoops!");
}