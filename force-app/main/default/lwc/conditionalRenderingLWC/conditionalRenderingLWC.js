import { LightningElement } from 'lwc';

export default class ConditionalRenderingLWC extends LightningElement 

{

    showMe = false;
    handleChange(event)
    {
        this.showMe = event.target.checked;
    }
}