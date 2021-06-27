import { getElementById, round } from "./utils";

const convertArray = ["temp", "temp-max", "temp-min", "temperature-felt"];

const ctof = (tempInC) => round((parseInt(tempInC.textContent) * 9) / 5 + 32);

const ftoc = (tempInF) => round(((parseInt(tempInF.textContent) - 32) * 5) / 9);

const convertToF = () => {
  for (const element of convertArray) {
    let ele = getElementById(element);
    ele.textContent = ctof(ele);
  }
};

const convertToC = () => {
  for (const element of convertArray) {
    let ele = getElementById(element);
    ele.textContent = ftoc(ele);
  }
};

export { convertToF, convertToC };
