//Repeating setup
//If we need to setup code before and after each test
//beforeEach and afterEach example
beforeEach(() => {
  initializeCityDatabase();
});

afterEach(() => {
  clearCityDatabase();
});

test("city database has Vienna", () => {
  expect(isCity("Vienna")).toBeTruthy();
});

test("city database has San Juan", () => {
  expect(isCity("San Juan")).toBeTruthy();
});

//asynchronous code - return Promise or we can use done at end of code
beforeEach(() => {
  return initializeCityDatabase();
});
//--------------------------------------------------------------------------------


//One time setup - if code can be reused between tests
beforeAll(() => {
  return initializeCityDatabase();
});

afterAll(() => {
  return clearCityDatabase();
});

test("city database has Vienna", () => {
  expect(isCity("Vienna")).toBeTruthy();
});

test("city database has San Juan", () => {
  expect(isCity("San Juan")).toBeTruthy();
});
//---------------------------------------------------------------------------------


//By default scope of before and after is global
//If we want it for specific tests, we can use describe
console.log("1");
describe("matching cities to foods", () => {
  // Applies only to tests in this describe block
  beforeEach(() => {
    return initializeFoodDatabase();
  });
  console.log("2");
  test("Vienna <3 veal", () => {
    console.log("4");
    expect(isValidCityFoodPair("Vienna", "Wiener Schnitzel")).toBe(true);
  });

  test("San Juan <3 plantains", () => {
    console.log("5");
    expect(isValidCityFoodPair("San Juan", "Mofongo")).toBe(true);
  });
});
console.log("3");
//Jest executes all describe handlers in a test file before it executes any of the actual tests
//use test.only to run a particular test and skip the remaining tests
