import { LightningElement } from 'lwc';
export default class ParentComponentCommunication extends LightningElement {
    count=0;
    /*handleEventChange()
    {
         console.log("handleEventChange");
        this.count= this.count+1;
    }*/

    endValue = 0;
    msg = ' ';
    handleEventChange(event)
    {
         console.log("handleEventChange from parent");
        this.endValue = event.detail.endValue;
        this.msg = event.detail.msg;
        this.count= this.count+1;
    }

}