const getElementById = (id) => document.querySelector(`#${id}`);

const validateCity = (city) => city.length > 0;

const round = (number) => Math.round(number);

const displayErrorMessage = (message) => {
  let errorMessage = getElementById("err-message");
  errorMessage.textContent = message;
  errorMessage.style.visibility = "visible";
  setTimeout(() => {
    errorMessage.style.visibility = "hidden";
  }, 4000);
};

export { getElementById, validateCity, round, displayErrorMessage };
