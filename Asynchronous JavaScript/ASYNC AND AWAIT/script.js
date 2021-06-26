const img = document.querySelector("img")

async function getCats(){
   const response = await fetch("https://api.giphy.com/v1/gifs/translate?api_key=cYPVGXwAMqDmh9NjY4akxj4Z3b6CSuVb&s=cats", {mode: "cors"})
   const catData = await response.json()
   img.src = catData.data.images.original.url
}
getCats()