/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/api.js":
/*!********************!*\
  !*** ./src/api.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"validateInputCity\": () => (/* binding */ validateInputCity),\n/* harmony export */   \"weatherApi\": () => (/* binding */ weatherApi),\n/* harmony export */   \"filterData\": () => (/* binding */ filterData),\n/* harmony export */   \"fillData\": () => (/* binding */ fillData)\n/* harmony export */ });\n/* harmony import */ var _apikey__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apikey */ \"./src/apikey.js\");\n\r\n\r\n//validate inputCity\r\nconst validateInputCity = (city) => {\r\n  return city.length > 0;\r\n};\r\n\r\nconst round = (int) => {\r\n  return Math.round(int)\r\n}\r\n\r\n//Request to Weather api\r\nasync function weatherApi(city) {\r\n  try {\r\n    let response = await fetch(\r\n      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${_apikey__WEBPACK_IMPORTED_MODULE_0__.default}`\r\n    );\r\n    let data = await response.json();\r\n    return data;\r\n  } catch (err) {\r\n    console.log(\"err\");\r\n  }\r\n}\r\n\r\nfunction getDate() {\r\n  let date = new Date();\r\n  return (\r\n    date.getDate() + \"/\" + (date.getMonth() + 1) + \"/\" + date.getFullYear()\r\n  );\r\n}\r\n\r\nfunction getTime() {\r\n  let time = new Date();\r\n  return time.getHours() + \":\" + time.getMinutes() + \":\" + time.getSeconds();\r\n}\r\n\r\nfunction filterData(data) {\r\n  let city = data.name;\r\n  let visibility = data.visibility;\r\n  let windSpeed = data.wind.speed;\r\n\r\n  let {\r\n    temp,\r\n    temp_max: tempMax,\r\n    temp_min: tempMin,\r\n    feels_like: temperatureFelt,\r\n    pressure: airPressure ,\r\n    humidity,\r\n  } = data.main;\r\n\r\n  let main = data.weather[0].main;\r\n\r\n  return {\r\n    date: getDate().toString(),\r\n    time: getTime().toString(),\r\n    city,\r\n    visibility: Number(visibility) / 1000,\r\n    airPressure,\r\n    humidity,\r\n    windSpeed,\r\n    temp: round(temp),\r\n    tempMax: round(tempMax),\r\n    tempMin: round(tempMin),\r\n    temperatureFelt: round(temperatureFelt),\r\n    main\r\n  };\r\n}\r\n\r\nfunction fillData({\r\n  date,\r\n  time,\r\n  city,\r\n  visibility,\r\n  airPressure,\r\n  humidity,\r\n  windSpeed,\r\n  temp,\r\n  tempMax,\r\n  tempMin,\r\n  temperatureFelt,\r\n  main\r\n}) {\r\n  let display = [\r\n      { key: \"#city\", value : city }, \r\n      { key: \"#date\", value : date }, \r\n      { key: \"#time\", value : time }, \r\n      { key: \"#visibility\", value : `${visibility}` }, \r\n      { key: \"#air-pressure\", value : `${airPressure}` }, \r\n      { key: \"#humidity\", value : `${humidity}`}, \r\n      { key: \"#wind-speed\", value : `${windSpeed}` }, \r\n      { key: \"#temp\", value : temp }, \r\n      { key: \"#temp-max\", value : tempMax },\r\n      { key: \"#temp-min\", value : tempMin }, \r\n      { key: \"#temperature-felt\", value : temperatureFelt },  \r\n      { key: \"#main\", value : main }, \r\n    ];\r\n    display.forEach(({key, value}) => {\r\n        //console.log(document.querySelector(key))\r\n        //console.log(value)\r\n        document.querySelector(key).textContent = value\r\n    })\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://weatherapp/./src/api.js?");

/***/ }),

/***/ "./src/apikey.js":
/*!***********************!*\
  !*** ./src/apikey.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst APIKEY = '79bb1c54625e220bf3d386e5a5086e4f'\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (APIKEY);\n\n//# sourceURL=webpack://weatherapp/./src/apikey.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _apikey__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apikey */ \"./src/apikey.js\");\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api */ \"./src/api.js\");\n/* harmony import */ var _tempConversion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tempConversion */ \"./src/tempConversion.js\");\n\r\n\r\n\r\n\r\n//console.log(APIKEY)\r\nlet inputCity = document.querySelector(\"#input-city\");\r\nlet searchBtn = document.querySelector(\"#search\");\r\nlet convert = document.querySelector(\"#convert\");\r\n\r\nsearchBtn.onclick = () => {\r\n  if ((0,_api__WEBPACK_IMPORTED_MODULE_1__.validateInputCity)(inputCity.value)) {\r\n    try {\r\n      let weatherData = (0,_api__WEBPACK_IMPORTED_MODULE_1__.weatherApi)(inputCity.value);\r\n      weatherData.then((data) => (0,_api__WEBPACK_IMPORTED_MODULE_1__.fillData)((0,_api__WEBPACK_IMPORTED_MODULE_1__.filterData)(data)));\r\n    } catch (err) {\r\n      console.log(err);\r\n    }\r\n  } else {\r\n  }\r\n};\r\n\r\nconvert.onchange = () => {\r\n  if (convert.checked) {\r\n    (0,_tempConversion__WEBPACK_IMPORTED_MODULE_2__.ctof)();\r\n  } else {\r\n    (0,_tempConversion__WEBPACK_IMPORTED_MODULE_2__.ftoc)();\r\n  }\r\n};\r\n\n\n//# sourceURL=webpack://weatherapp/./src/index.js?");

/***/ }),

/***/ "./src/tempConversion.js":
/*!*******************************!*\
  !*** ./src/tempConversion.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ctof\": () => (/* binding */ ctof),\n/* harmony export */   \"ftoc\": () => (/* binding */ ftoc)\n/* harmony export */ });\nconst convertArray = [\"temp\", \"temp-max\", \"temp-min\", \"temperature-felt\"];\r\n\r\nlet element = (id) => {\r\n  return document.querySelector(`#${id}`);\r\n};\r\n\r\nconst ctof = () => {\r\n  convertArray.forEach((id) => {\r\n    const ele = element(id);\r\n    ele.textContent = Math.round((parseInt(ele.textContent) * 9) / 5 + 32);\r\n  });\r\n};\r\n\r\nconst ftoc = () => {\r\n  convertArray.forEach((id) => {\r\n    const ele = element(id);\r\n    ele.textContent = Math.round(((parseInt(ele.textContent) - 32) * 5) / 9);\r\n  });\r\n};\r\n\r\n\r\n\n\n//# sourceURL=webpack://weatherapp/./src/tempConversion.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;