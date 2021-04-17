const fetch = require('node-fetch');

let url = "http://localhost:5000/api/exs/Bisection";
/* 
let settings = { method: "Get" }; */

let c=0;

async function get(){
    let a;
    await fetch(url)
        .then(res => res.json())
        .then((json) => {
            a = json
            c = json.xl
        });
    return a;
}
let b = get();
console.log(c);
