# Thunks, Sagas, and Epics, oh my!

## Redux
1. Flow is synchronous
2. UIs require asychronous actions or "side effects" sometimes

## Redux Basics - Actions and Action Creators

### Actions
1. Simple JS Objects
2. Requires a 'type' property
3. Example: 
```javascript
{
   type: ‘ADD’,
   payload: data
}
```
4. We use Redux to 'dispatch' actions to reducers to change state

### Action Creators
1. Functions that create actions
3. Simple Example:
```javascript
function addText(text) {
   return {
      type: 'ADD_TEXT',
      text
   };
}
```
4. Redux Example - Encourages pure functions
```javascript
dispatch(addText(text));
```
5. Flux Example - NOT a pure function:
```javascript
function dispatchAddTextAction(text) {
  const action = {
    type: 'ADD_TEXT',
    text
  };
  dispatch(action);
}
```
6. Bound action creators
```javascript
const boundAddText = text => dispatch(addText(text));
boundAddText('having fun');
```

## Actions and Action Creators Recap
1. Synchronous flow of actions - important!
2. Encourage 'pure' functions (action creators) and good functional programming (composition)


## Thunks, Sagas, Epics - Redux Middleware
1. Allows asynchronous actions in Redux
2. Thunks - returns functions
3. Sagas - returns function generators
4. Epics - returns functions that return observables


## Thunks
1. Create an action creator that returns a function(dispatch,getState)
2. Chain dispatches and promises, such as calls to the server
3. Maintain synchronous flow through your Redux app
4. Example:
```javascript
function makeSandwichesForEverybody() {
  return function (dispatch, getState) {
    // We can dispatch both plain object actions and other thunks,
    // which lets us compose the asynchronous actions in a single flow.
    return Promise.all([
        dispatch(makeASandwichWithSecretSauce('Me')),
        dispatch(makeASandwichWithSecretSauce('Friend'))
    ]).then(() =>
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
```javascript
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
4. Sagas allow a cleaner way, than Thunks, to handle side effects and errors, and return the original state


## Epics
1. Create an action creator that returns an observable of actions
2. Observable Example:
```javascript
const startTicking = (actions, store) => 
  Observable.interval(1000)
    .map((i) => ({ type: 'TICK', i }))
    .takeUntil(actions.ofType('STOP_TICK'));
dispatch(startTicking);

// to stop the ticking actions at a later point
dispatch({ type: 'STOP_TICK' });
```
3. Like thunks and sagas, we can handle complicated asynchronous sequences, but in "observable" style
4. Epics, like Sagas, allow a cleaner way to handle side effects and errors, and return the original state


# References
- Actions and Creators - https://redux.js.org/docs/basics/Actions.html
- Thunks - https://github.com/gaearon/redux-thunk
- Generators - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
- Sagas - https://www.youtube.com/watch?v=xDuwrtwYHu8
- Redux Sagas - https://redux-saga.js.org/docs/introduction/
- Observables - http://reactivex.io/intro.html
- Redux Epics - https://redux-observable.js.org/docs/basics/Epics.html
- A Better Explanation - https://medium.com/react-native-training/redux-4-ways-95a130da0cdc
