import { LightningElement } from 'lwc';
export default class LifecycleHooks extends LightningElement
 {
     myList = []
constructor()
{
    super();
    console.log("Constructor Called");
}
connectedCallback() {
    //code
    this.myList.push('Salesforce');
    console.log("Connected Call Back");
    
}
disconnectedCallback() {
    this.myList =[];
    console.log ("disconnected Call Back");

}
renderedCallback(){
    //code
    console.log('Rendered CallBack')
}
errorCallback(error, stack) {
    this.error = error;
}
}