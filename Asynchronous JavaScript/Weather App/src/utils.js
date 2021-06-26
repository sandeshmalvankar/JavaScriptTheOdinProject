const getElementById = (id) => document.querySelector(`#${id}`);

const validateCity = (city) => city.length > 0;

export { getElementById, validateCity };
