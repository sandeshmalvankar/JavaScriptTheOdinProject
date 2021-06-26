const img = document.querySelector("img");
const button = document.querySelector("button");
const input = document.querySelector("input");
const body = document.querySelector("body");

body.onload = () => {
  fetchImage("cats");
};

input.onchange = () => fetchImage(input.value);

const fetchImage = (object) => {
  fetch(
    "https://api.giphy.com/v1/gifs/translate?api_key=cYPVGXwAMqDmh9NjY4akxj4Z3b6CSuVb&s=" +
      object,
    { mode: "cors" }
  )
    .then(function (response) {
      //console.log(response)
      return response.json();
    })
    .then(function (response) {
      //console.log(response.data.images.original.url);
      img.src = response.data.images.original.url;
    })
    .catch(() => {
      alert(input.value + " GIF doesn't exist.");
    }); //its returning another promise so we need one more then
};

button.innerText = "Change GIF";
button.onclick = () => {
  fetchImage("cats");
};
