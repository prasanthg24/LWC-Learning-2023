import { LightningElement,wire ,api} from 'lwc';
import {getRecord,getFieldValue} from 'lightning/uiRecordApi';
export default class WireWithFunction extends LightningElement 
{

    @api recordId;
    accounts;
    error;

    @wire (getRecord,{recordId : "$recordId",fields : ["Account.Name"]})
    WiredAcc({error,data})
    {
        if(data)
        {
            console.log('###Getting data from Function---'+data);
            this.accounts = data;
        }
        else if(error)
        {
            this.error = error;
            console.log('Error =='+error.body.message);
        }
    }

}