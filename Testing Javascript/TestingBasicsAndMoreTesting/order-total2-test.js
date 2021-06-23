const { it, expect } = require("@jest/globals");
const { orderTotal2 } = require("./order-total");
const { apikey } = require("./apikey");

it("calls weatherApi correctly ", () => {
  let isFakeFetchCalled = false;
  const fakeFetch = (url) => {
    expect(url).toBe(
      "https://api.openweathermap.org/data/2.5/weather/?q=ichalkaranji&units=metric&appid=" +
        apikey
    );
    isFakeFetchCalled = true;
    return Promise.resolve({
      json: () =>
        Promise.resolve({
          main: {
            temp: 29,
          },
        }),
    });
  };
  return orderTotal2(fakeFetch, {
    country: India,
    items: [{ name: "Dragon candy", price: 2, quantity: 3 }],
  }).then((res) => {
    expect(res).toBe(20 * 2);
    expect(isFakeFetchCalled).toBe(true);
  });
});

it("Quantity", () =>
  orderTotal2(null, {
    items: [{ name: "Dragon candy", price: 2, quantity: 3 }],
  }).then((res) => expect(res).toBe(6)));

it("No quantity specified", () =>
  orderTotal2(null, {
    items: [{ name: "Dragon candy", price: 3 }],
  }).then((res) => expect(res).toBe(3)));

it("Happy path (Example 1)", () =>
  orderTotal2(null, {
    items: [
      { name: "Dragon food", price: 8, quantity: 1 },
      { name: "Dragon cage (small)", price: 800, quantity: 1 },
    ],
  }).then((res) => expect(res).toBe(808)));

it("Happy path(ex 2)", () =>
  orderTotal2(null, {
    items: [
      { name: "Dragon collar", price: 20, quantity: 1 },
      { name: "Dragon chew toy", price: 40, quantity: 1 },
    ],
  }).then((res) => expect(res).toBe(60)));
