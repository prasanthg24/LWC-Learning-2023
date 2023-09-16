import { LightningElement ,api} from 'lwc';
export default class ParentComponentusingapi extends LightningElement {


        percentage  =20;
        HandleChange(event)
        {
            this.percentage = event.target.value;
        }
}