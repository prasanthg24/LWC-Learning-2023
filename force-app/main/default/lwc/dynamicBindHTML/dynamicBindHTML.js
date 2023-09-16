import { LightningElement } from 'lwc';

export default class DynamicBindHTML extends LightningElement

{

    myValue ='Prasanth Gopinathan'
    handleChange(event)
    {
            this.myValue = event.target.value;
    }
}