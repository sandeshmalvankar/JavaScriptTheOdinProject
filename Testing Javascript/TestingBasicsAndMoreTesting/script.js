//test running systems - mocha, jasmine, tape and jest

//Test Driven Development
//TDD is one way to think through your requirements or design before your write your functional code

/*
Why we write tests?
1. Keeps you out of the debugger!
2. Reduces bugs in new features and in existing features
3. Improves design
4. Speeds up development by eliminating waste
5. less bugs, higher quality software
*/
//----------------------------------------------------------------------------------------------------


//example of how complexcity grows
const someOrder = {
  items: [
    { name: "Dragon Food", price: 8, quantity: 8 },
    { name: "Dragon Cage", price: 80, quantity: 8 },
    { name: "Shipping", price: 40, shipping: true },
  ],
};

const orderTotalFinal = (order) => {
  totalItems = order.items
    .filter((x) => !x.shipping)
    .reduce((prev, cur) => prev + cur.quantity * cur.price, 0);

  shippingItem = order.items.find((x) => !!x.shipping);
  shipping = totalItems > 1000 ? 0 : shippingItem.price;
  return totalItems + shipping;
};
result = orderTotalFinal(someOrder);
console.log(result);
//----------------------------------------------------------------------------------------------------


//unit test (maunally written)
function orderTotal(order) {
  return order.items.reduce(
    (prev, cur) => cur.price * (cur.quantity || 1) + prev,
    0
  );
}

if (
  orderTotal({
    items: [{ name: "Dragon candy", price: 2, quantity: 3 }],
  }) !== 6
) {
  throw new Error("Check fail : Quantity");
}

if (
  orderTotal({
    items: [{ name: "Dragon candy", price: 3 }],
  }) !== 3
) {
  throw new Error("Check fail : no quantity specified");
}

if (
  orderTotal({
    items: [
      { name: "Dragon food", price: 8, quantity: 1 },
      { name: "Dragon cage (small)", price: 800, quantity: 1 },
    ],
  }) !== 808
) {
  throw new Error("Check fail : Happy path (Example 1)");
}

if (
  orderTotal({
    items: [
      { name: "Dragon collar", price: 20, quantity: 1 },
      { name: "Dragon chew toy", price: 40, quantity: 1 },
    ],
  }) !== 60
) {
  throw new Error("Check fail : Happy path(ex 2)");
}
//----------------------------------------------------------------------------------------------------


//command to install jest
//npm i --save-dev jest
//npm run test
//npm run watch

//run jest from command line
//npm install jest --global
//jest my-test --notify --config=config.json

//generate basic configuration file
//jest --init

//using babel
//yarn add --dev babel-jest @babel/core @babel/preset-env
// babel.config.js
module.exports = {
  presets: [["@babel/preset-env", { targets: { node: "current" } }]],
};
// babel.config.js
module.exports = (api) => {
  const isTest = api.env("test");
  // You can use isTest to determine what presets and plugins to use.
  return {
    // ...
  };
};
// jest.config.js
module.exports = {
  transform: {},
};
//----------------------------------------------------------------------------------------------------


//Pure Functions
//The function always returns the same result if the same arguments are passed in. It does not depend on any state, or data, change during a program’s execution. It must only depend on its input arguments.
//The function does not produce any observable side effects such as network requests, input and output devices, or data mutation.
//One of the major benefits of using pure functions is they are immediately testable. They will always produce the same result if you pass in the same arguments.
//pure function
function evaluateGuess(magicNumber, guess) {
  if (guess > magicNumber) {
    return "YOUR GUESS IS TOO BIG";
  } else if (guess < magicNumber) {
    return "YOUR GUESS IS TOO SMALL";
  } else if (guess == magicNumber) {
    return "YOU DID IT! 🎉";
  }
}
//impure function
function guessingGame() {
  const magicNumber = 22;
  const guess = prompt("guess a number between 1 and 100!");
  const message = evaluateGuess(magicNumber, guess);
  alert(message);
}
//----------------------------------------------------------------------------------------------------


//Mocking
//writing “fake” versions of a function that always behaves exactly how you want