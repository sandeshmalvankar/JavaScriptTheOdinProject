//last video
/*
// L1
console.log("🥪 Synchronous 1");
// L2
setTimeout((_) => console.log(`🍅 Timeout 2`), 0);
// L3
Promise.resolve().then((_) => console.log("🍍 Promise 3"));
// L4
console.log("🥪 Synchronous 4");
//output seq - L1 L4 L3 L2
//bcz of microtask queue has higher priority Promises get executed first
*/
//------------------------------------------------------------------------------

const tick = Date.now();
const log = (v) => console.log(`${v} \n Elapsed: ${Date.now() - tick}ms`);

/*
const codeBlocker = () => {
    
    //Blocking
    let i = 0 
    while(i<1000000000) i++
    return '🐷 billion loops done'
    

    
    //async blocking
    return new Promise((resolve, reject) => {
        let i=0;
        while(i< 1000000000) i++
        resolve('🐷 billion loops done')
    })
    

    
    //async non blocking
    return Promise.resolve().then(v => {
        let i=0;
        while(i< 1000000000) i++
        return '🐷 billion loops done'
    })
    
}

log("🥪 Synchronous 1");
//log(codeBlocker())
codeBlocker().then(log)

log("🥪 Synchronous 2");
*/
//----------------------------------------------------------------

const getFruit = async (name) => {
  const fruits = {
    pineapple: "🍍",
    peach: "🍑",
    strawberry: "🍓",
  };
  return fruits[name];
};
//getFruit('pineapple').then(log)

//async + await
const makeSmoothie = async () => {
  const a = await getFruit("pineapple");
  const b = await getFruit("strawberry");
  return [a, b];
};
//makeSmoothie().then(log)

const makeSmoothie2 = async () => {
  let a;
  return getFruit("pineapple")
    .then((v) => {
      a = v;
      return getFruit("peach");
    })
    .then((v) => [a, v]);
};
//makeSmoothie2().then(log)

const makeSmoothieFaster = async () => {
  const a = getFruit("pineapple");
  const b = getFruit("peach");
  const smoothie = await Promise.all([a, b]);
  return smoothie;
};
//makeSmoothieFaster().then(log)

const fruitRace = async () => {
  const a = getFruit("pineapple");
  const b = getFruit("peach");
  return await Promise.race([a, b]);
};
//fruitRace().then(log)
//----------------------------------------------------------------

//Loops
const fruits = ["peach", "pineapple", "strawberry"];

/*
const smoothie = fruits.map( async v => {
    const emoji = await getFruit(v)
    log(emoji)
    return emoji
})
*/
//not recommanded to use map with array if we want to use async fun inside it

const fruitLoop = async () => {
  for (const f of fruits) {
    const emoji = await getFruit(f);
    log(emoji);
  }
};
//fruitLoop()

const fruitInspection = async () => {
  if ((await getFruit("peach")) == "🍑") console.log("peachy");
};
//fruitInspection();
//---------------------------------------------------------------

const smoothie = fruits.map((v) => getFruit(v));

const fruitLoop2 = async () => {
  for await (const emoji of smoothie) log(emoji);
};
fruitLoop2()