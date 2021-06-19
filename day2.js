let z= 4;

function valueFunction(obj) {
  obj.num = 67;
}
// obj {...} // 500k
let obj = {num: 4}
valueFunction(obj);//?
obj;//?

const sum = x => y => {
  z = x; // Side Effect
  return x + y
};

sum(5)(7);//?

const fn = (x) => x+1;

const arr = [1,2,3,4];
const arr2 = arr.map(fn);//?
arr !== arr2;//?

// map
// reduce
// filter

// find
// some

//TODO: LAZYNESS

//*******************************************
// ADTs con Crocks
//*******************************************
const Async = require('crocks/Async');

// Referencia de left y right en Node nativamente
// const fs = require('fs');
// fs.readFile('', (err, data) => {})

const fetchService = num2 => num1 => Async((_, resolve) => resolve(num1 + num2))
const fetchDatabase = num2 => num1 => Async((reject) => reject(num1 + num2))

let num = 65;
const pipeline = Async.of(num) // Async.Resolved
  // A => A
  .map((num) => num +6)
  // A => B(C) // Kleisly Arrow: donde B [Async] (monad)
  .chain(fetchService(5))
  .chain(fetchService(5)) // (Async(number))

pipeline.fork((left) => console.error(left), right => console.log(right));

//*******************************************
// Applicatives [ap]
//*******************************************

// En Js
function suma(num1, num2) {
  return num1 + num2;
}
suma(3,4);//?
suma.cualquierCosa = 'asdf';
suma.apply(undefined, [5, 10]);//?
suma.call(undefined, 5, 12);//?

const getNumber = (timeout) => (num) => {
  return Async((reject, resolve) => {
    setTimeout(() => {
      resolve(num);
    }, timeout);
  })
}

const inicio = new Date();
Async.of(num1 => num2 => /* () => */ num1 - num2)
  .ap(getNumber(5000)(4))
  .ap(getNumber(2000)(2))
  // .ap(Async((reject, resolve) => { // PREGUNTA -> Mala practica...
  //   setInterval(() => {
  //     resolve();
  //     console.log('Pase por aqui');
  //   }, 100);
  // }))
  .map(x=> { console.log('', x); return x; }) 
  .fork(console.error, result => {
    console.log('tardo:', new Date().valueOf() - inicio.valueOf());
    console.log('El applicative:', result);
  });


const asyncSum = (num1) => (num2) => {
  return Async((reject, resolve) => {
    setTimeout(() => {
      resolve(num1 + num2);
    }, 100);
  })
}

Async.of(6)
  .chain(getNumber(1000))
  .chain(asyncSum(8))
  .fork(console.error, result => {
    console.log('############ result:', result)
  })

