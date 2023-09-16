import { LightningElement ,wire } from 'lwc';
import getAccList from '@salesforce/apex/accController.getAccList';
export default class BindImperativeMethods extends LightningElement {

        accounts;
        error;

        handleClick()
        {
                getAccList()
                .then((result)=>
                {
                    this.accounts= result;
                    this.error = undefined;
                })
                .catch((error)=>
                {
                this.error = error;
                this.accounts=undefined;
                });
        }
}