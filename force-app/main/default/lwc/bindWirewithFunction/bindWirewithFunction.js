import { LightningElement ,wire} from 'lwc';
import getAccList from '@salesforce/apex/accController.getAccList';

export default class BindWirewithFunction extends LightningElement 
{
    accounts;
    error;

    @wire (getAccList)
    WiredAccounts({error,data})
    {
        if(data)
        {
            this.accounts =data;
            this.error =undefined;
        }
        else if(error)
        {
            this.error =error;
            this.accounts = undefined;
        }
    }
}