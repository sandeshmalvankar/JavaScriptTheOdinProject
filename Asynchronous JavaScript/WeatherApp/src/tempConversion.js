const convertArray = ["temp", "temp-max", "temp-min", "temperature-felt"];

let element = (id) => {
  return document.querySelector(`#${id}`);
};

const ctof = () => {
  convertArray.forEach((id) => {
    const ele = element(id);
    ele.textContent = Math.round((parseInt(ele.textContent) * 9) / 5 + 32);
  });
};

const ftoc = () => {
  convertArray.forEach((id) => {
    const ele = element(id);
    ele.textContent = Math.round(((parseInt(ele.textContent) - 32) * 5) / 9);
  });
};

export { ctof, ftoc, element };
