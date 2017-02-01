import { createStore } from 'redux';

const reducer = (state = '', action) => {
  switch (action.type) {
    case 'CHARACTER_TYPED':
      return state + action.char;
    case 'BACKSPACE':
      return state.substr(0, state.length - 1);
    default:
      return state;
  }
};

const store = createStore(reducer);

function View(text) {
  console.log(`"${text}"`);
}

const text = store.getState();
View(text);

const userInput = `This is some amazing text!`;
  let index = 0;
  const interval = setInterval(() => {
    // if we still have text to process
    if (index < userInput.length) {
      // tell the reducer to add the character
      store.dispatch(insertCharacter(userInput[index++]));
    } else {
      // otherwise stop
      clearInterval(interval);
  }
  // do this every 0.25 seconds (or 250ms)
}, 250);

// let's abstract our rendering logic above into a rendering function that gathers data for a view and renders it to the user
function render() {
  const text = store.getState();
  View(text);
}
// when the store's data changes we'll run our rendering function effectively turning it into a rendering loop
store.subscribe(render);

/*
 * getState
 */
// Define a variable to hold that value which we'll call: state
let state;
// Expose a way to access it
export function getSTate() {
  return state;
}


/*
 * suscribe(listener)
 */
 // As many actors might be interested in this piece of state, we will define a place to hold our list of listeners
 let listeners = [];
 export function subscribe(listener) {
   // When someone subscribes we store the listener on the list...
   listeners.push(listener);
   // ...and give them a function that will allow them to stop listening whenever they think they don't need it anymore.
   return function unsubscribe() {
     listeners = listeners.filter(l => l !== listener);
   };
 }

 /*
  * dispatch(action)
  */
 export function dispatch(action) {
   // Set the state to whatever the reducer returned after being called with the current state and the action we want to process.
   state = reducer(state, action);
   // Call the listeners
   listeners.forEach(listener => listener());
   // As we will see in future chapters, it is handy to return the action itself as a user could leverage it to, e.g., wait on a Promise's result to do further tasks.
   return action;
 }
