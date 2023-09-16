import { LightningElement, wire, api,track } from 'lwc';
import getRelatedData from '@salesforce/apex/AccountDetailController.getRelatedData';
import { NavigationMixin } from 'lightning/navigation';


const CHILD_ACCOUNT_COLUMNS = [
   
    { label: 'Account Name', fieldName: 'Name' },
    { label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'currency' },
    { label: 'Rating', fieldName: 'Rating' },
    { label: 'Type', fieldName: 'Type' },
    // { label: 'Parent Account Name', fieldName: 'Parent.Name' },
];



export default class AccountList extends LightningElement 
{
   @api recordId;
    childAccountColumns = CHILD_ACCOUNT_COLUMNS;
    childAccountsData;
    displayConfirmationModal =true

   buttonclick = 'Account';


    
    @wire(getRelatedData, { accountId: '$recordId' })
    wiredRelatedData({ error, data }) {
        if (data) 
        {
            this.childAccountsData = data.childAccounts;
            console.log("childAccountsData--");
          
        } else if (error) {
            
        }
    }



    createAccount() 
    {
          //  alert("Test")
            //displayConfirmationModal =false
          /* const newRecordButton = this.template.querySelector('c-new-Record-Button');
                if (newRecordButton) {
                newRecordButton.handleClick();
            }*/
                //const childCMP=this.template.querySelector('c-new-Record-Button').changeMessage(this.ButtonClick);

    }

}