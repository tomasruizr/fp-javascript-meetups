const { compose } = require("rambda");

const sumarCurry = (num1) => (num2) => num1 + num2

const f = sumarCurry(1)(2);//?
f;//?
// f(4);//?

function sumar(num1, num2) {
  // fetch(microserviceX)
  return num1 + num2;
}

const restarCurry = num2 => num1 => num1 - num2;

function restar(num1, num2) {
  return num1 - num2;
}

function processNumber(num){
  const x1 = sumar(num, 5);
  const x2 = restar(x1, 5);
  const x3 = sumar(x2, 6);
  const x4 = sumar(x3, 2);

  return x4;
}
const composing = num => sumar(sumar(restar(sumar(num, 5), 5), 6), 2);

// const processNumbercomposed = compose(
//   sumarCurry(2),
//   sumarCurry(6),
//   restarCurry(5),
//   sumarCurry(5),
// );


const processNumbercomposed2 = (num) => compose(
  processNumbercomposed,
  restarCurry(5),
  sumarCurry(3),
  sumarCurry(6),
  sumarCurry(2),
)(num);

function processNumber2(num){
  const x1 = num + 5;
  const x2 = restar(x1, 3);

  return x2;
}

const processNumbercomposed = compose(
  sumarCurry(2),
  sumarCurry(6),
  restarCurry(5),
  sumarCurry(5),
);
processNumbercomposed(5);//?
composing(5);//?
processNumber(5);//?
processNumber2(5);//?

const promise = new Promise((resolve, reject) => resolve(4))
  .then(value => value +4)
  .then(value => Promise.reject(value + 4))
  .then(value => value +4)
  .then(value => value +4)
  .then(value => value +4)
  .catch(value => Promise.reject(value + 10))
  .catch(value => Promise.reject(value + 10))
  .catch(value => Promise.reject(value + 10))
  .catch(value => Promise.reject(value + 10))
  .catch(value => Promise.reject(value + 10))
  .catch(value => value +4)
  .then(console.log);//?


// Functor
const x = promise.then((value) => value + 4); // *
x;//?

// Monad <-
const y = promise.then((value) => Promise.reject(value + 4)); // *
y;//?



const fetchService = num2 => num1 => new Promise(resolve => resolve(num1 + num2))
const fetchDatabase = num2 => num1 => new Promise((resolve, reject) => reject(num1 + num2))

//num = user
function getExcercisesFromCourseByUser(num) {
  return Promise.resolve(num)
    // .then(num=>fetchService(5)(num))
    .then(fetchService(5))
    .then(fetchService(5))
    .then(fetchService(5))
    .then(fetchService(5))
    .then(fetchService(5))
    .then(fetchDatabase(6))
  }

  getExcercisesFromCourseByUser(7);//?