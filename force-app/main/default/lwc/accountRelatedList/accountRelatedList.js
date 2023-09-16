import { LightningElement, wire, api } from 'lwc';
import getRelatedData from '@salesforce/apex/AccountDetailController.getRelatedData';

const CHILD_ACCOUNT_COLUMNS = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'currency' },
    { label: 'Created Date', fieldName: 'CreatedDate', type: 'date',
    typeAttributes: {
            value: 
            { 
                fieldName: 'CreatedDate' 
            },
            dateStyle: 'short',
            month: '2-digit',
            day: '2-digit',
            year: '2-digit'
        } },
   
    { label: 'Status', fieldName: 'Status__c', type: 'text' },
];

const CONTACT_COLUMNS = [
    { label: 'Name', fieldName: 'Name', type: 'Text'  },
    { label: 'Email', fieldName: 'Email' },
    { label: 'Created Date', fieldName: 'CreatedDate', type: 'date',
    typeAttributes: {
            value: 
            { 
                fieldName: 'CreatedDate' 
            },
            dateStyle: 'short',
            month: '2-digit',
            day: '2-digit',
            year: '2-digit'
        } },
     { label: 'Do Not Call', fieldName: 'DoNotCall', type: 'boolean' }
];

export default class AccountRelatedList extends LightningElement {
    @api recordId;
    childAccountColumns = CHILD_ACCOUNT_COLUMNS;
    contactColumns = CONTACT_COLUMNS;
    childAccountsData;
    contactsData;
    
    @wire(getRelatedData, { accountId: '$recordId' })
    wiredRelatedData({ error, data }) {
        if (data) {
            this.childAccountsData = data.childAccounts;
            this.contactsData = data.contacts;
        } else if (error) {
            // Handle error
        }
    }
}


/*import { LightningElement, wire, api } from 'lwc';
import getRelatedData from '@salesforce/apex/AccountDetailController.getRelatedData';

const CHILD_ACCOUNT_COLUMNS = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Status', fieldName: 'Status' },
    { label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'currency' },
    { label: 'Created Date', fieldName: 'CreatedDate', type: 'date' }
];

const CONTACT_COLUMNS = [
    { label: 'First Name', fieldName: 'FirstName' },
    { label: 'Last Name', fieldName: 'LastName' },
    { label: 'Do Not Call', fieldName: 'DoNotCall', type: 'boolean' },
    { label: 'Email', fieldName: 'Email' },
    { label: 'Created Date', fieldName: 'CreatedDate', type: 'date' }
];

export default class AccountRelatedList extends LightningElement {
    @api recordId;
    childAccountColumns = CHILD_ACCOUNT_COLUMNS;
    contactColumns = CONTACT_COLUMNS;
    childAccountsData;
    contactsData;

    @wire(getRelatedData, { accountId: '$recordId' })
    wiredRelatedData({ error, data }) {
        if (data) {
            this.childAccountsData = data.childAccounts;
            this.contactsData = data.contacts;
        } else if (error) {
            // Handle error
        }
    }
}*/