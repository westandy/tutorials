# Practical Functional Programming

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
const divideBy = d => n => n/d;

const divideBy10 = divideBy(10);

const answer = divideBy10(20);

console.log(answer); // 2
```

- In this example, we "bind" `10` to `d` when we create the function `divideBy10`.  We can say `10` is "closed" to `divideBy10`.

### React and Closures
- what React components may look like without `React`

#### Stateless Functional Component:
```javascript
const MyFunctionalComponent = (props = {stuff:''}) => {
   return function () { // render
      const {stuff} = props;
      return `This is printing out props: ${stuff}`;
   }
}
const comp = MyFunctionalComponent({stuff:'yeah!'});
console.log(comp()); // This is printing out props: yeah!
```

#### Stateless Class Component:
```javascript
function MyClassComponent (props = {stuff:''}) {
   // Constructor :
   if ( !(this instanceof MyClassComponent) ) {
        return new MyClassComponent(props);
   }

   this.props = props;
   // End Constructor

   this.render = function() {
      const {stuff} = this.props;
      return `This is printing out props: ${stuff}`;
   }
   this.render = this.render.bind(this);

   // Render method
   return this.render;
}

const comp = /*new*/ MyClassComponent({stuff:'yeah!'});
console.log(comp()); // This is printing out props: yeah!
```

#### Stateful Class Component
```javascript
function MyStatefulClassComponent (props = {stuff:''}) {
   // Constructor :
   if ( !(this instanceof MyStatefulClassComponent) ) {
        return new MyStatefulClassComponent(props);
   }

   this.props = props;
   this.state = { count: 0 };
   // End Constructor

   this.increment = () => {
      this.state.count++;
   };
   this.increment = this.increment.bind(this);

   this.decrement = () => {
      this.state.count--;
   };
   this.decrement = this.decrement.bind(this);

   this.render = function() {
      const {stuff} = this.props;
      const {count} = this.state;
      return `My Props: ${stuff}, My State: ${this.state.count} `;
   }
   this.render = this.render.bind(this);

   // Render method
   return {
      render:this.render,
      increment:this.increment,
      decrement:this.decrement
   };
}

const comp = /*new*/ MyStatefulClassComponent({stuff:'yeah!'});
console.log(comp.render()); // My Props: yeah!, My State: 0

comp.increment();
console.log(comp.render()); // My Props: yeah!, My State: 1

comp.decrement();
console.log(comp.render()); // My Props: yeah!, My State: 0
```
## Partial Application

## Currying 

## Immutable Data
- Seriously, why do we care? 

- Remember those higher order functions?

1) ```javascript filter``` - create a new list with equal or fewer items
2) ```javascript map``` - create a new array of apples from an array of oranges
3) ```javascript reduce``` - create a new elephant from a list of mice

### This is why we care:
1) For the higher-order functions, the existing list is not modified, and the new data is created when it is needed.
2) Mutating data opens us up for bugs, in the same vein as do stateful components, objects, services, etc. do. 
3) Functions that do not mutate their parameters are easy to test.


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
return someListOfData.reduce((accumulator,data) => accumulator = accumulate(data),[]);
```



## References
- React Components & createReactClass - https://reactjs.org/docs/react-without-es6.html
- A Practical Introduction to Functional Programming - https://maryrosecook.com/blog/post/a-practical-introduction-to-functional-programming
- Functional JavaScript by Michael Fogus
- Understanding JavaScript Closures - http://javascriptissexy.com/understand-javascript-closures-with-ease/
- Closures, Partial Application and Currying: Effective Functional JavaScript - https://hackernoon.com/ingredients-of-effective-functional-javascript-closures-partial-application-and-currying-66afe055102a
