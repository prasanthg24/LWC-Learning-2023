import { LightningElement } from 'lwc';
export default class ChildComponentCommunication extends LightningElement {
endValue = 10;
handleClick()
{  //console.log("dispatch");
   // this.dispatchEvent(new CustomEvent ('increasecount'));//child to parent communication bubbleup event
  
  const myEventWithValue  = new CustomEvent ("incresecount",{
      detail : {
          endValue : this.endValue,
          msg : "welcome to LWC Jee"
      }
  });

  this.dispatchEvent(myEventWithValue); 
  console.log("dispatch myEventWithValue");
}
}