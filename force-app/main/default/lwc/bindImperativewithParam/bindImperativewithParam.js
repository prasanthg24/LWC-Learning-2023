import { LightningElement } from 'lwc';
import findAccList from '@salesforce/apex/accController.findAccList';
export default class BindImperativewithParam extends LightningElement {

        searchkey =" "
        accounts;
        error;
        handleChange(event)
        {
            this.searchkey =event.target.value;
        }

         handleClick()
        {
                findAccList({keyword:this.searchkey})
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