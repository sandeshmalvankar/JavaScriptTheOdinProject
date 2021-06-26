//JavaScript Object Notation (JSON) is a standard text-based format for representing structured data based on JavaScript object syntax. 
//Used for transmitting data in web applications

//validate json - https://jsonlint.com/, https://jsonformatter.curiousconcept.com/

/*
XMLHttpRequest (XHR) 
This is a very useful JavaScript object that allows us to make network requests to retrieve resources from a server via JavaScript

//parse(): Accepts a JSON string as a parameter, and returns the corresponding JavaScript object.
//stringify(): Accepts an object as a parameter, and returns the equivalent JSON string.

let myObj = { name: "Chris", age: 38 }; //js object
myObj
let myString = JSON.stringify(myObj); //return json 
myString
*/
//----------------------------------------------------------------------------------------------------------


let superHeroes = 
{
    "squadName" : "Super Hero Squad",
    "homeTown" : "Metro City",
    "formed" : 2016,
    "secretBase" : "Super tower",
    "active" : true,
    "members" : [
      {
        "name" : "Molecule Man",
        "age" : 29,
        "secretIdentity" : "Dan Jukes",
        "powers" : [
          "Radiation resistance",
          "Turning tiny",
          "Radiation blast"
        ]
      },
      {
        "name" : "Madame Uppercut",
        "age" : 39,
        "secretIdentity" : "Jane Wilson",
        "powers" : [
          "Million tonne punch",
          "Damage resistance",
          "Superhuman reflexes"
        ]
      },
    ]
  }

//How to read parsed json
superHeroes.homeTown //Metro City
superHeroes['active'] //true
superHeroes['members'][1]['powers'][2] //Superhuman reflexes
//----------------------------------------------------------------------------------------------


//Arrays as JSON
[
    {
      "name": "Molecule Man",
      "age": 29,
      "secretIdentity": "Dan Jukes",
      "powers": [
        "Radiation resistance",
        "Turning tiny",
        "Radiation blast"
      ]
    },
    {
      "name": "Madame Uppercut",
      "age": 39,
      "secretIdentity": "Jane Wilson",
      "powers": [
        "Million tonne punch",
        "Damage resistance",
        "Superhuman reflexes"
      ]
    }
  ]

[0]["powers"][0] //Radiation resistance
//----------------------------------------------------------------------------------------------


//JSON.parse()
//dates are not allowed in JSON
const jsonText = '{"name":"John", "birth":"1986-12-14", "city":"New York"}';
const obj = JSON.parse(jsonText);
obj.birth = new Date(obj.birth);
obj
//----------------------------------------------------------------------------------------------


//Reviver function
const jsonText = '{"name":"John", "birth":"1986-12-14", "city":"New York"}';
const obj = JSON.parse(jsonText, function (key, value) {
  if (key == "birth") {
    return new Date(value);
  } else {
    return value;
  }
});
//----------------------------------------------------------------------------------------------


//function in JSON 
const text = '{"name":"John", "age":"function () {return 30;}", "city":"New York"}';
const obj = JSON.parse(text);
obj.age = eval("(" + obj.age + ")");
obj.age()


//----------------------------------------------------------------------------------------------


//JSON.stringify() in case of function
const obj = {name: "John", age: function () {return 30;}, city: "New York"};
obj.age = obj.age.toString();
const myJSON = JSON.stringify(obj);
//if u dont convert it into string, age property will not be stringified