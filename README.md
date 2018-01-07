# Thunks, Sagas, and Epics, oh my!

## Redux Basics - Actions and Action Creators

### Actions
1. Simple JS Objects
2. Requires a 'type' property
3. Example: 
```
{
   type: ‘ADD’,
   payload: data
}
```
4. Use: redux 'dispatches' actions to reducers to change state

### Action Creators
1. Functions that create actions
3. Simple Example:
```
function addText(text) {
   return {
      type: 'ADD_TEXT',
      text
   };
}
```
4. Redux Example - Encourages pure functions
```
dispatch(addText(text));
```
5. Flux Example - NOT a pure function:
```
function dispatchAddTextAction(text) {
  const action = {
    type: 'ADD_TEXT',
    text
  };
  dispatch(action);
}
```
6. Bound action creators
```
const boundAddText = text => dispatch(addText(text));
boundAddText('having fun');
```

## Actions and Action Creators Recap
1. Synchronous flow of actions - important!
2. Encourage 'pure' functions (action creators) and good functional programming (composition)


## Thunks, Sagas, Epics - Redux Middleware
1. Allows asynchronous actions in Redux
2. Thunks - allows action creators that return functions
3. Sagas - allows action creators that return function generators
4. Epics - allows action creators to return functions that return observables


## Thunks
1. Create an action creator that returns a function(dispatch,getState)
2. Chain dispatches and promises, such as calls to the server
3. Maintain synchronous flow through your Redux app
4. Example:
```
function makeSandwichesForEverybody() {
  return function (dispatch, getState) {
    // We can dispatch both plain object actions and other thunks,
    // which lets us compose the asynchronous actions in a single flow.

    return dispatch(
      makeASandwichWithSecretSauce('My Grandma')
    ).then(() =>
      Promise.all([
        dispatch(makeASandwichWithSecretSauce('Me')),
        dispatch(makeASandwichWithSecretSauce('Friend'))
      ])
    ).then(() =>
      dispatch(makeASandwichWithSecretSauce('Our neighbors'))
    ).then(() =>
      dispatch(getState().myMoney > 42 ?
        withdrawMoney(42) :
        apologize('Me', 'The Sandwich Shop')
      )
    );
  };
}
```


## Sagas
1. Create an action creator that returns a function generator
2. Generator Example:
```
function* counter() {
  const index = 0;
  while (index < 3)
    yield index++;
}

const gen = counter();

console.log(gen.next().value); // 0
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // undefined
```
3. Like thunks, we can handle complicated asynchronous sequences, but in "generator" style
4. Generators are more complicated to understand, but your code may become cleaner as a result


## Epics
1. Create an action creator that returns an observable of actions
2. Observable Example:
```
doObservable()
```


# References
1. Actions and Creators - https://redux.js.org/docs/basics/Actions.html
2. Thunks - https://github.com/gaearon/redux-thunk
3. Generators - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
4. Redux Sagas - https://redux-saga.js.org/docs/introduction/
5. Observables - http://reactivex.io/intro.html
6. Redux Epics - https://redux-observable.js.org/docs/basics/Epics.html
