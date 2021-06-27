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

const createEleWithClass = (ele, className) => {
  const element = document.createElement(ele);
  element.classList.add(className);
  return element;
};

export {
  getElementById,
  validateCity,
  round,
  displayErrorMessage,
  createEleWithClass,
};
