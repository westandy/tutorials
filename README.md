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

