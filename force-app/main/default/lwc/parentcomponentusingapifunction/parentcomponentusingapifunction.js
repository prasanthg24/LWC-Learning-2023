import { LightningElement } from 'lwc';
export default class Parentcomponentusingapifunction extends LightningElement {

        handleClick()
        {
         this.template.querySelector('c-childcomponentusingapifunction').refresh();
        }
}