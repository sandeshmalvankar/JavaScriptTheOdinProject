const getElementById = (id) => document.querySelector(`#${id}`);

const validateCity = (city) => city.length > 0;

const round = (number) => Math.round(number);

export { getElementById, validateCity, round };
