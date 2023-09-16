import { LightningElement,api } from 'lwc';
export default class LwcHelloworld extends LightningElement {

    @api name ="Prasanth G"

    @api callMe()
    {
        console.log('Hello From LWC Console');
    }
}