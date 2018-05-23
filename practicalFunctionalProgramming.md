# Practical Functional Programming
  
1) What I Plan to Cover:
   - Briefly: Higher Order Functions, Chaining, Pipelines
   - Not-So-Briefly: Closures, Partial Application, Currying, Immutable Data
2) What I Do **Not** Plan to Cover:
   - Redux
   - Recursion
   - Formal definitions of functional concepts

## Familiar Functional Concepts:
1) Functions as Building Blocks
   - Functions that are simple blocks for building larger blocks (functions), that do not mutate their parameters, are easy to test.  
2) Higher Order Functions 
   - functions that take functions as arguments
   - see `map, filter, reduce`
3) Lambda functions 
   - nameless functions to give higher order functions
   
## Chaining
- using functions as building blocks, we create 'chains' of methods:
- Example 1
```javascript
return someData.json().cleanup(...).filter(...).map(...).doSomething().finalizeTheData();
```
- Example 2
```javascript
Promise.resolve(someData).then(...).then(...).catch(...);
```

## Pipelines
```javascript
renderATitle(turnSentenceIntoTitle(readIn(someData)));
```

## Closures 
- Bind data or methods to a function only to use them later 

```javascript
function divideBy(d) {
  return function(n) {
    return n / d;
  };
}
const divideBy10 = divideBy(10);
const answer = divideBy10(20);
console.log(answer); // 2
```

- In this example, we "bind" `10` to `d` when we create the function `divideBy10`.  We can say `10` is "closed" to `divideBy10`.

### React and Closures
- what React components may look like without `React`

#### Stateless Functional Component:
```javascript
const MyFunctionalComponent = (props = { stuff: '' }) => {
  return function() { // render
    const { stuff } = props;
    return `This is printing out props: ${stuff}`;
  };
};
const comp = MyFunctionalComponent({ stuff: 'yeah!' });
console.log(comp()); // This is printing out props: yeah!
```

#### Stateless Class Component:
```javascript
function MyClassComponent(props = { stuff: '' }) {
  // Constructor :
  this.props = props;
  // End Constructor

  // render
  return function() {
    const { stuff } = this.props;
    return `This is printing out props: ${stuff}`;
  };
}

const comp = MyClassComponent({ stuff: 'yeah!' });
console.log(comp()); // This is printing out props: yeah!
```

#### Stateful Class Component
```javascript
function MyStatefulClassComponent(props = { stuff: '' }) {
  // Constructor :
  this.props = props;
  this.state = { count: 0 };
  // End Constructor

  const increment = () => {
    this.state.count++;
  };

  const decrement = () => {
    this.state.count--;
  };

  const render = () => {
    const { stuff } = this.props;
    const { count } = this.state;
    return `My Props: ${stuff}, My State: ${this.state.count} `;
  };
  // Render method
  return {
    render,
    increment,
    decrement
  };
}

const comp = /*new*/ MyStatefulClassComponent({ stuff: 'yeah!' });
console.log(comp.render()); // My Props: yeah!, My State: 0

comp.increment();
console.log(comp.render()); // My Props: yeah!, My State: 1

comp.decrement();
console.log(comp.render()); // My Props: yeah!, My State: 0
```
## Partial Application (PA)
- You apply some of the required parameters of a function and return a function that takes the rest of the parameters.

### Not PA
```javascript
function turnArrayInto(func = () => {},list = []) {
        return list.map(func);
}

const apples = ['golden delicious','red','fuji'];
const orangeFunc = item => 'red naval';
const oranges = turnArrayInto(orangeFunc,apples);
console.log('Oranges',oranges); // ['red naval','red naval','red naval']
```

### With PA
```javascript
function turnArrayInto(func = () => {},list = []) {
        return list.map(func);
}

function partialTurnArrayInto(func) {
        return function(list) {
                return turnArrayInto(func,list);
        }
}
const apples = ['golden delicious','red','fuji'];
const orangeFunc = item => 'red naval';
const turnIntoOranges = partialTurnArrayInto(orangeFunc);
const oranges = turnIntoOranges(apples);
console.log('Oranges',oranges); // ['red naval','red naval','red naval']
```

### PA In React

 - We can use Partial Application in event handlers in our render methods
 
```javascript
class MyComponent extends React.Component {
  partialHandleLinkClick(type, activeType){
    return function(e) {
      const hasKeyboardModifier = e.ctrlKey || e.shiftKey || e.altKey || e.metaKey;
      updateType(type, activeType, hasKeyboardModifier);
    };
  }
  render() {
    const types = [ 'Foo', 'Bar', 'Baz' ];
    return (
      <div>
        {
          types.map( (type, i) => {
            <a key={i} href="#"
              onClick={this.partialHandleLinkClick(type, this.props.activeType)}>
              {type}
            </a>
          })
        }
      </div>
    );
  }
}
```

## Currying 
- Generalization of Partial Application
- You apply a parameter one at a time to a function
- Turn a single function with many parameters into a many functions each with a single parameter

### First Example
```javascript
function curry(func) {
  return function(secondArg) {
    return function(firstArg) {
      return func(firstArg, secondArg);
    };
  };
}
const parseBinary = curry(parseInt)(2);

console.log(parseBinary('111'));  // 7
console.log(parseBinary('10'));   // 2
```

### Second Example

```javascript
function curry2(func) {
  return function(arg) {
    return func(arg);
  };
}
console.log(['11', '11', '11', '11'].map(parseInt));         // [ 11, NaN, 3, 4 ]
console.log(['11', '11', '11', '11'].map(curry2(parseInt)));  // [ 11, 11, 11, 11 ]
```

### Third Example
```javascript
// Revisited from Closures
function divideNByD(n, d) {
  return n / d;
}

const divideBy10 = curry(divideNByD)(10);
const answer = divideBy10(20);
console.log(answer);
```

## Immutable Data
- Remember those higher order functions?

1) ```javascript filter``` - create a new list with equal or fewer items
2) ```javascript map``` - create a new array of apples from an array of oranges
3) ```javascript reduce``` - create a new elephant from a list of mice

### An Example:

#### Non-Functional Approach:
```javascript
let someArray = [];
   ... 
   someListOfData...
   someArray.push(...data);
   ...
return someArray = [];
```

#### Functional Approach:
```javascript
return someListOfData.reduce((accumulator,data) => accumulate(data),[]);
```

### Some Reasons why we may care about Immutable Data (not-exhaustive):
1) For the higher-order functions, the existing list is not modified, and the new data is created when it is needed 
2) Mutating data opens us up for bugs, in the same vein as do stateful components, objects, services, etc. do
3) Functions that do not mutate their parameters are easy to test
4) Immutability makes our methods and application deterministic
5) Why else would we care?


## References
- React Components & createReactClass - https://reactjs.org/docs/react-without-es6.html
- A Practical Introduction to Functional Programming - https://maryrosecook.com/blog/post/a-practical-introduction-to-functional-programming
- Functional JavaScript by Michael Fogus
- Understanding JavaScript Closures - http://javascriptissexy.com/understand-javascript-closures-with-ease/
- Closures, Partial Application and Currying: Effective Functional JavaScript - https://hackernoon.com/ingredients-of-effective-functional-javascript-closures-partial-application-and-currying-66afe055102a
- My Working Code - https://git.healthgrades.com/awestmeyer/kata
