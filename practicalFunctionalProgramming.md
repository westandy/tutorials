# Practical Functional Programming

## Clarity
```javascript
const list = ['a','b','c','d'];

const first = list[0]; // imperative

const firstElem = firstElement(list); // declarative
```

## Functional Specific Things:
1) Higher Order Functions 
   - functions that take functions as arguments
   - see `map, filter, reduce`
2) Lambda functions 
   - nameless functions to give higher order functions
3) We see this in both JavaScript and C# (and many other languages)

## Closures 
- Bind data or methods to a function only to use them later 

```javascript
const divideBy = d => n => n/d;

const divideBy10 = divideBy(10);

const answer = divideBy10(20);

console.log(answer); // 2
```

- In this example, we "bind" `10` to `d` when we create the function `divideBy10`.  We can say `10` is "closed" to `divideBy10`.

## React and Closures

### Functional Component:
```javascript
const MyFunctionalComponent = (props = {stuff:''}) => {
   return function () { // render
      const {stuff} = props;
      return `This is printing out props: ${stuff}`;
   }
}
const comp = MyFunctionalComponent({stuff:'yeah!'});
console.log(comp()); // This is printing out props: yeah!

### ClassComponent
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

const comp = new MyClassComponent({stuff:'yeah!'});
console.log(comp()); // This is printing out props: yeah!
```
