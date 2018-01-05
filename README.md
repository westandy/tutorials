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
2. Use: Redux 'dispatches' actions created by an action creator
3. Simple Example:
```
function addText(text) {
   return {
      type: 'ADD_TEXT',
      text
   };
}
```
4. Flux Example:
```
function dispatchAddTextAction(text) {
  const action = {
    type: 'ADD_TEXT',
    text
  };
  dispatch(action);
}
```
5. Redux Example - keeps dispatch separate from the action creator, through composition
```
dispatch(addText(text));
```
6. Bound action creators
```
const boundAddText = text => dispatch(addText(text));
boundAddText('having fun');
```



#Thunks -> simple, ‘impure reducers’
Epics -> Actions In, Actions Out, requires understanding of Observables/RxJS

