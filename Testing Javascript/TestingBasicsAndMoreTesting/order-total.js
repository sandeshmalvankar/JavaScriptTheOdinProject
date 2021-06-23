const { apikey } = require("./apikey");

function orderTotal(order) {
  return order.items.reduce(
    (prev, cur) => cur.price * (cur.quantity || 1) + prev,
    0
  );
}

//Asynchronous function
function orderTotal2(fetch, order) {
  if (order.country) {
    return fetch(
      "https://api.openweathermap.org/data/2.5/weather/?q=ichalkaranji&units=metric&appid=" +
        apikey
    )
      .then((res) => res.json())
      .then((data) => data.main.temp)
      .then(
        (vat) =>
          order.items.reduce(
            (prev, cur) => cur.price * (cur.quantity || 1) + prev,
            0
          ) * vat
      );
  }
  return Promise.resolve(
    order.items.reduce((prev, cur) => cur.price * (cur.quantity || 1) + prev, 0)
  );
}

module.exports = { orderTotal, orderTotal2 };
