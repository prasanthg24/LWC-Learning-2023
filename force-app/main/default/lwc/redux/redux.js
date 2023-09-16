const reduxEventTarget = new EventTarget();

export const registerListener = (eventName, handler) => 
{
  reduxEventTarget.addEventListener(eventName, handler);
  console.log(eventName  ,handler);
};























// export const unregisterAllListeners = () => {
//   reduxEventTarget.removeEventListener(eventName);
//   console.log("im in unregisterAllListeners");
// };

// export const dispatchEvent = (eventName, data) => {
//   const event = new CustomEvent(eventName, { detail: data });
//   reduxEventTarget.dispatchEvent(event);
//   console.log("im in dispatchEvent");
// };
























// // redux.js

// // Create a global event target for dispatching and subscribing to events
// const reduxEventTarget = new EventTarget();


// export const registerListener = (eventName, handler) => {
//   reduxEventTarget.addEventListener(eventName, handler);
//   console.log("im in registerListener---------");

  
// };

// export const unregisterAllListeners = () => {
//   reduxEventTarget.reduxState = null;
//   console.log('reduxEventTarget---' + reduxEventTarget.reduxState);
// };