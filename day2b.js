const Identity = require('crocks/Identity');
const First = require('crocks/First');
const Max = require('crocks/Max');
const All = require('crocks/All');
const Sum = require('crocks/Sum');
//*******************************************
// Semigroups [Concat]
//*******************************************

const str = 'asdf';
const newStr = str.concat('1234');//?
newStr !== str;//?

const arr = [1,2,3];
const newArr = arr.concat([4,5,6]);//?
newArr !== arr;//?

Identity.of([1,2,3])
  .concat(Identity.of([4,5,6]))
  .valueOf();//?


First(4)
  .concat(First(5))
  .concat(First(3))
  .concat(First(4))
  .concat(First(5))
  .concat(First(8))
  .valueOf()
  .either(x=>x, x=>x)
;//?
Max(4)
  .concat(Max(5))
  .concat(Max(13))
  .concat(Max(4))
  .concat(Max(5))
  .concat(Max(8))
;//?

All(true)
  .concat(All(true))
  .concat(All(true))
;//?

Sum(4)
  .concat(Sum(5))
  .concat(Sum(3))
  .concat(Sum(4))
  .concat(Sum(5))
  .concat(Sum(8))
  .valueOf()
;//?

function User(initialValue) {
  const data = initialValue || {
    name:'',
    points: 0
  };
  
  const concat = (otherUser) => {
    return User({
      name: First(data.name).concat(First(otherUser.data.name)).valueOf().either(x=>x,x=>x),
      points: Sum(data.points).concat(Sum(otherUser.data.points)).valueOf()
    })
  };
  return {
    data,
    concat
  }
}

const user1 = {
  name: 'tomas225', // First
  points: 45 // Sum
}

const user2 = {
  name: 'tomas2',
  points: 48
}

const mergedUser = Identity.of(User(user1))
  .concat(Identity.of(User(user2)))
  .concat(Identity.of(User({name: 'asdf', points: 10})))
  .concat(Identity.of(User({name: 'asdf', points: 17})))
  .concat(Identity.of(User({name: 'asdf', points: 10})))
  .concat(Identity.of(User({name: 'asdf', points: 10})))
  .concat(Identity.of(User({name: 'asdf', points: 10})))
mergedUser;//?

